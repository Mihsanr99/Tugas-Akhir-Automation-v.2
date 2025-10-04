# 🎯 POM & Intercept Implementation Summary

## Overview
Dokumen ini menunjukkan **semua implementasi POM dan Intercept** dalam project automation OrangeHRM.

---

## 📊 Total Implementation

| Category | Count | Files |
|----------|-------|-------|
| **Page Objects** | 4 | LoginPage, ForgotPasswordPage, DashboardPage, DirectoryPage |
| **Tests with POM** | 38 | All test cases |
| **Tests with Intercept** | 10 | Login (4), Forgot Password (2), Directory (4) |
| **Custom Commands with Intercept** | 2 | loginWithIntercept, setupAPIIntercepts |

---

## 🔷 Page Object Model (POM) Implementation

### 1. LoginPage.js
**Location:** `cypress/pages/LoginPage.js`

**POM Elements:**
```javascript
elements = {
  UsernameInput: () => cy.get('input[name="username"]'),
  PasswordInput: () => cy.get('input[name="password"'),
  LoginButton: () => cy.get('button[type="submit"]'),
  errorMessage: () => cy.get('.oxd-alert-content-text'),
  ForgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
  loginContainer: () => cy.get('.orangehrm-login-container'),
  loginTitle: () => cy.get('.orangehrm-login-title')
}
```

**POM Methods:**
- `visit()` - Navigate to login page
- `enterUsername(username)` - Input username
- `enterPassword(password)` - Input password
- `clickLogin()` - Click login button
- `clickForgotPassword()` - Navigate to forgot password
- `login(username, password)` - Complete login flow
- `verifyLoginPageVisible()` - Verify page loaded
- `verifyErrorMessage(message)` - Verify error display

**Used in Tests:** TC001-TC016 (16 tests)

---

### 2. ForgotPassword.js
**Location:** `cypress/pages/ForgotPassword.js`

**POM Elements:**
```javascript
elements = {
  usernameInput: () => cy.get('input[name="username"]'),
  resetButton: () => cy.get('button[type="submit"]'),
  cancelButton: () => cy.get('button[type="button"]').contains('Cancel'),
  pageTitle: () => cy.get('.orangehrm-forgot-password-title'),
  formContainer: () => cy.get('.orangehrm-forgot-password-container'),
  inputRequired: () => cy.get('.oxd-input-field-error-message')
}
```

**POM Methods:**
- `visit()` - Navigate to forgot password page
- `enterUsername(username)` - Input username
- `clickReset()` - Click reset button
- `clickCancel()` - Click cancel button
- `clearUsername()` - Clear username field
- `resetPassword(username)` - Complete reset flow
- `verifyForgotPasswordPageVisible()` - Verify page loaded
- `verifyPageTitle(title)` - Verify title

**Used in Tests:** TC001-TC010 (10 tests)

---

### 3. DashboardPage.js
**Location:** `cypress/pages/DashboardPage.js`

**POM Elements:**
```javascript
elements = {
  dashboardTitle: () => cy.get('.oxd-topbar-header-breadcrumb h6'),
  sideMenu: () => cy.get('.oxd-sidepanel'),
  directoryMenuItem: () => cy.get('.oxd-main-menu-item').contains('Directory'),
  userDropdown: () => cy.get('.oxd-userdropdown'),
  userName: () => cy.get('.oxd-userdropdown-name'),
  topbar: () => cy.get('.oxd-topbar')
}
```

**POM Methods:**
- `clickDirectory()` - Navigate to directory
- `clickUserDropdown()` - Open user menu
- `clickLogout()` - Logout
- `navigateToDirectory()` - Complete navigation
- `verifyDashboardVisible()` - Verify dashboard loaded
- `verifySideMenuVisible()` - Verify menu visible

**Used in Tests:** All directory tests + Login success verification

---

### 4. DirectoryPage.js
**Location:** `cypress/pages/DirectoryPage.js`

**POM Elements:**
```javascript
elements = {
  pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb h6'),
  employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]').first(),
  locationDropdown: () => cy.get('.oxd-select-text').eq(0),
  jobTitleDropdown: () => cy.get('.oxd-select-text').eq(1),
  searchButton: () => cy.get('button[type="submit"]'),
  resetButton: () => cy.contains('button', 'Reset'),
  employeeCards: () => cy.get('.orangehrm-directory-card'),
  formCard: () => cy.get('.orangehrm-paper-container')
}
```

**POM Methods:**
- `visit()` - Navigate to directory page
- `enterEmployeeName(name)` - Input employee name
- `selectLocation(location)` - Select location filter
- `selectJobTitle(jobTitle)` - Select job title filter
- `clickSearch()` - Click search button
- `clickReset()` - Click reset button
- `verifyDirectoryPageVisible()` - Verify page loaded
- `verifySearchFormVisible()` - Verify form visible

**Used in Tests:** TC001-TC012 (12 tests)

---

## 🌐 API Intercept Implementation

### Login Tests - Intercept Cases

#### **TC002: Login with API intercept**
```javascript
cy.intercept('GET', '**/employees/action-summary').as('loginAPI');
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      cy.wait('@loginAPI').its('response.statusCode').should('eq', 200);
      dashboardPage.verifyDashboardVisible();
```
**Purpose:** Verify login API is called and returns 200

---

#### **TC003: Multiple API calls intercept**
```javascript
cy.intercept('GET', '**/employees/action-summary').as('employeesAPI');
      cy.intercept('GET', '**/dashboard/**').as('dashboardAPI');
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      cy.wait('@employeesAPI').its('response.statusCode').should('eq', 200);
      cy.wait(1000);
      dashboardPage.verifyDashboardVisible();
```
**Purpose:** Monitor multiple API calls during login

---

#### **TC004: API response structure verification**
```javascript
cy.intercept('GET', '**/employees/action-summary').as('loginResponse');
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      cy.wait('@loginResponse').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('data');
      });
```
**Purpose:** Validate API response structure

---

#### **TC012: Performance test with intercept**
```javascript
cy.intercept('GET', '**/employees/action-summary').as('performanceAPI');
      const startTime = Date.now();
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      cy.wait('@performanceAPI').then(() => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        expect(duration).to.be.lessThan(6000);
        cy.log(`Login completed in ${duration}ms`);
      });
```
**Purpose:** Measure login performance with API timing

---

### Forgot Password Tests - Intercept Cases

#### **TC003 & TC004: Reset password API verification**
```javascript
cy.intercept('POST', testData.apiEndpoints.resetPassword).as('resetRequest');
    forgotPasswordPage.enterUsername(testData.forgotPassword.validUsername);
    forgotPasswordPage.clickReset();
    cy.wait('@resetRequest', { timeout: 10000 });
```
**Purpose:** Verify reset password API is triggered

---

#### **TC006: Verify no API call on empty field**
```javascript
cy.intercept('POST', '**/auth/requestResetPassword').as('resetAPI');
      forgotPasswordPage.clickReset();
      cy.wait(1000);
      cy.contains('Required').should('be.visible');
      cy.get('@resetAPI.all').should('have.length', 0);
```
**Purpose:** Ensure API not called when validation fails

---

### Directory Tests - Intercept Cases

#### **TC008: call directory API on search**
```javascript
cy.intercept('GET', '**/directory/employees**').as('directoryAPI');
      directoryPage.clickSearch();
      cy.wait('@directoryAPI', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
```
**Purpose:** Verify directory search API is called

---

#### **TC009: verify API response structure with intercept**
```javascript
cy.intercept('GET', '**/directory/employees**').as('searchAPI');
      directoryPage.clickSearch();
      cy.wait('@searchAPI', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('data');
});
```
**Purpose:** Validate directory API response structure

---

#### **TC010: Multiple API calls tracking**
```javascript
cy.intercept('GET', '**/directory/employees**').as('directoryAPI');
        directoryPage.clickSearch();
        cy.wait('@directoryAPI').its('response.statusCode').should('eq', 200);
        directoryPage.clickReset();
        cy.wait(1000);
        directoryPage.clickSearch();
        cy.wait('@directoryAPI').its('response.statusCode').should('eq', 200);
        cy.get('@directoryAPI.all').should('have.length.at.least', 2);
```
**Purpose:** Track multiple API calls during user interaction

---

## 🛠️ Custom Commands with POM & Intercept

### 1. loginWithIntercept
**Location:** `cypress/support/commands.js`

```javascript
Cypress.Commands.add('loginWithIntercept', (username, password) => {
  cy.intercept('GET', '**/employees/action-summary').as('loginAPI');
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.wait('@loginAPI');
});
```

**Used in:** All directory tests

---

### 2. setupAPIIntercepts
**Location:** `cypress/support/commands.js`

```javascript
Cypress.Commands.add('setupAPIIntercepts', () => {
  cy.intercept('GET', '**/employees/action-summary').as('employeesSummary');
  cy.intercept('GET', '**/directory/employees**').as('directoryEmployees');
  cy.intercept('POST', '**/auth/validate').as('loginValidate');
  cy.intercept('POST', '**/auth/requestResetPassword').as('resetPassword');
});
```

**Purpose:** Setup common intercepts for multiple tests

---

## 📈 Implementation Statistics

### POM Usage Breakdown

| Test Suite      | Total Tests | POM Methods Used | POM Elements Used |
|-----------------|-------------|------------------|-------------------|
| Login           | 16          | 8+               | 7+                |
| Forgot Password | 10          | 6+               | 6+                |
| Directory       | 12          | 8+               | 8+                |

### Intercept Usage Breakdown

| Test Suite      | Total Tests | Tests with Intercept | Intercept Percentage |
|-----------------|-------------|----------------------|----------------------|
| Login           | 16          | 4                    | 25%                  |
| Forgot Password | 10          | 2                    | 20%                  |
| Directory       | 12          | 4                    | 33%                  |
| **Total**       | **38**      | **10**               | **26%**              |

---

## ✅ Best Practices Implemented

### POM Best Practices:
✅ All selectors centralized in elements object
✅ Reusable action methods
✅ Verification methods separated
✅ Method chaining support (return this)
✅ Clear naming conventions
✅ ES6 class-based structure
✅ Single responsibility principle

### Intercept Best Practices:
✅ Meaningful alias names (@loginAPI, @directoryAPI)
✅ Proper timeout handling
✅ Response validation
✅ Status code verification
✅ Response structure validation
✅ Multiple intercepts coordination
✅ Performance measurement

---

## 🎯 Key Benefits

### POM Benefits Achieved:
1. **Maintainability** - Easy to update selectors in one place
2. **Reusability** - Methods used across multiple tests
3. **Readability** - Test code is clean and understandable
4. **Scalability** - Easy to add new page objects
5. **Collaboration** - Clear structure for team work

### Intercept Benefits Achieved:
1. **API Validation** - Verify all API calls
2. **Performance Testing** - Measure response times
3. **Response Verification** - Validate data structure
4. **Network Monitoring** - Track all requests
5. **Test Reliability** - Wait for actual API responses

---

## 📝 Code Examples

### Complete Test Example with POM & Intercept

```javascript
it('TC004: Should verify API response structure with intercept', () => {
  // ✅ Setup Intercept
  cy.intercept('GET', '**/employees/action-summary').as('loginResponse');
  
  // ✅ Use POM methods
  loginPage.login(
    testData.validCredentials.username,
    testData.validCredentials.password
  );
  
  // ✅ Verify with Intercept
  cy.wait('@loginResponse').then((interception) => {
    expect(interception.response.statusCode).to.eq(200);
    expect(interception.response.body).to.have.property('data');
  });
  
  // ✅ Verify UI with POM
  dashboardPage.verifyDashboardVisible();
});
```

---

## 🔗 File References

| Component             | File Location                         |
|-----------------------|---------------------------------------|
| Login POM             | `cypress/pages/LoginPage.js`          |
| Forgot Password POM   | `cypress/pages/ForgotPassword.js` |
| Dashboard POM         | `cypress/pages/DashboardPage.js`      |
| Directory POM         | `cypress/pages/DirectoryPage.js`      |
| Login Tests           | `cypress/e2e/Login.cy.js`             |
| Forgot Password Tests | `cypress/e2e/ForgotPassword.cy.js`    |
| Directory Tests       | `cypress/e2e/directory.cy.js`         |
| Custom Commands       | `cypress/support/commands.js`         |

---

**Last Updated:** October 2025  
**Total Test Cases:** 38  
**POM Pages:** 4  
**Intercept Tests:** 10  
**Status:** ✅ Fully Implemented