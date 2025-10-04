# 🚀 Setup Guide - OrangeHRM Cypress Automation

## Langkah-langkah Setup Project

### 1. Clone Repository
```bash
git clone https://github.com/username/cypress-orangehrm-automation.git
cd cypress-orangehrm-automation
```

### 2. Install Node.js
Pastikan Node.js terinstall (v16 atau lebih tinggi)
```bash
node --version
npm --version
```

Download dari: https://nodejs.org/

### 3. Install Dependencies
```bash
npm install
```

Dependencies yang akan terinstall:
- Cypress v13.x
- Mochawesome Reporter
- Dan dependencies lainnya

### 4. Verifikasi Instalasi Cypress
```bash
npx cypress verify
```

### 5. Buka Cypress Test Runner
```bash
npm run cypress:open
```

## 📂 Struktur Folder

```
cypress-orangehrm-automation/
│
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── login.cy.js         # 16 login tests
│   │   ├── forgotPassword.cy.js # 10 forgot password tests
│   │   └── directory.cy.js     # 12 directory tests
│   │
│   ├── pages/                  # Page Object Models
│   │   ├── LoginPage.js
│   │   ├── ForgotPassword.js
│   │   ├── DashboardPage.js
│   │   └── DirectoryPage.js
│   │
│   ├── fixtures/               # Test data
│   │   └── testData.json
│   │
│   └── support/                # Custom commands
│       ├── commands.js
│       └── e2e.js
│
├── cypress.config.js           # Cypress configuration
├── package.json
└── README.md
```

## ▶️ Menjalankan Tests

### Mode Interactive (Recommended untuk Development)
```bash
npm run cypress:open
```
- Pilih "E2E Testing"
- Pilih browser (Chrome/Firefox/Edge)
- Klik test file yang ingin dijalankan

### Mode Headless (CI/CD)
```bash
# Run all tests
npm run cypress:run

# Run specific test file
npm run test:login
npm run test:forgot
npm run test:directory
```

### Run dengan Browser Spesifik
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## 📊 Test Coverage Summary

### Login Tests (16 Test Cases)
✅ Login dengan kredensial valid
✅ Verifikasi API login dengan intercept
✅ Verifikasi multiple API calls dengan intercept
✅ Verifikasi struktur response API
✅ Login dengan username kosong
✅ Login dengan password kosong
✅ Login dengan username & password kosong
✅ Login dengan kredensial invalid
✅ Verifikasi no redirect on invalid login
✅ Validasi semua elemen UI
✅ Navigasi ke forgot password
✅ Performance test dengan intercept
✅ Username with spaces (negative) 
✅ Password case insensitivity (negative)
✅ Username case insensitiviy (negative)
✅ Rapid multiple login attempts (negative)

### Forgot Password Tests (10 Test Cases)
✅ Tampilan halaman forgot password
✅ Tampilan semua elemen form
✅ Submit form dengan username valid
✅ Verifikasi reset API dipanggil dengan intercept
✅ Validasi username kosong
✅ Verifikasi no API call saat field empty
✅ Navigasi kembali ke login (cancel)
✅ Navigasi dari login ke forgot password
✅ Clear & re-enter username dengan POM
✅ Verifikasi form state setelah navigasi

### Directory Tests (12 Test Cases)
✅ Akses directory dari dashboard
✅ Tampilan page title
✅ Tampilan search form
✅ Tampilan semua filter fields
✅ Input employee name dengan POM
✅ Execute search dan verify URL
✅ Reset search form dengan POM
✅ API intercept untuk search
✅ Verifikasi struktur response API
✅ Verifikasi multiple API calls
✅ Interaksi location dropdown dengan POM
✅ Interaksi job title dropdown dengan POM

**Total: 38 Test Cases**

## 🎯 Key Features

### 1. Page Object Model (POM)
- Clean separation of test logic and page elements
- Reusable methods
- Easy maintenance
- Scalable architecture

### 2. API Intercept
- Mock API responses
- Validate API calls
- Test error scenarios
- Faster test execution

### 3. Custom Commands
- Login helper
- Wait utilities
- Assertion helpers

### 4. Test Organization
- Descriptive test names
- Proper test hooks (before, beforeEach)
- Independent tests
- Clear assertions

## 📝 Writing New Tests

### Example Test Structure
```javascript
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

describe('Login Functionality Tests', () => {
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    loginPage.visit();
  });

  describe('Positive Test - Login Tests', () => {
    it('TC001: Should login successfully with valid credentials', () => {
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      
      cy.wait(3000);
      dashboardPage.verifyDashboardVisible();
      cy.url().should('include', 'dashboard');
    });
    });
});
```

## 🔧 Configuration

### cypress.config.js
```javascript
{
  baseUrl: 'https://opensource-demo.orangehrmlive.com',
  viewportWidth: 1280,
  viewportHeight: 720,
  video: true,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  retries: {
    runMode: 2,
    openMode: 0
  }
}
```

### Modifikasi Configuration
Edit file `cypress.config.js` sesuai kebutuhan:
- `baseUrl` - URL aplikasi
- `viewportWidth/Height` - Ukuran viewport
- `video` - Record video
- `retries` - Retry failed tests

## 📈 Generating Reports

### HTML Report dengan Mochawesome
```bash
# Run tests
npm run cypress:run

# Generate report
npm run report
```

Report akan tersimpan di: `cypress/reports/`

### View Report
Buka file `cypress/reports/index.html` di browser

## 🔐 Best Practices

### 1. Keep Tests Independent
- Setiap test harus bisa run sendiri
- Tidak depend pada test lain
- Clean up setelah test

### 2. Use Proper Waits
- Gunakan `cy.wait()` untuk API
- Gunakan `.should('be.visible')` untuk elements
- Hindari hardcoded delays

### 3. Descriptive Test Names
```javascript
it('TC001-01: Should login successfully with valid credentials', () => {
  // Test implementation
});
```

### 4. Use Page Objects
- Semua selectors di Page Object
- Test file hanya test logic
- Reusable methods

### 5. API Intercepts
- Mock slow APIs
- Test error scenarios
- Validate request/response

## 📚 Resources

- [Cypress Documentation](https://docs.cypress.io)
- [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Add tests
4. Run all tests
5. Create pull request

---

**Happy Testing! 🎉**