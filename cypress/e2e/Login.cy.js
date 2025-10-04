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

    it('TC002: Should verify login with API intercept', () => {
      cy.intercept('GET', '**/employees/action-summary').as('loginAPI');
      
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      
      cy.wait('@loginAPI').its('response.statusCode').should('eq', 200);
      dashboardPage.verifyDashboardVisible();
    });

    it('TC003: Should verify multiple API calls on login with intercept', () => {
      cy.intercept('GET', '**/employees/action-summary').as('employeesAPI');
      cy.intercept('GET', '**/dashboard/**').as('dashboardAPI');
      
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      
      cy.wait('@employeesAPI').its('response.statusCode').should('eq', 200);
      cy.wait(1000);
      dashboardPage.verifyDashboardVisible();
    });

    it('TC004: Should verify API response structure with intercept', () => {
      cy.intercept('GET', '**/employees/action-summary').as('loginResponse');
      
      loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password
      );
      
      // Verify response structure
      cy.wait('@loginResponse').then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('data');
      });
    });
  });

  describe('Negative Test - Empty Field Validation Tests', () => {
    it('TC005: Should show error when username is empty', () => {
      loginPage.enterPassword(testData.validCredentials.password);
      loginPage.clickLogin();
      
      cy.wait(1000);
      cy.contains('Required').should('be.visible');
    });

    it('TC006: Should show error when password is empty', () => {
      loginPage.enterUsername(testData.validCredentials.username);
      loginPage.clickLogin();
      
      cy.wait(1000);
      cy.contains('Required').should('be.visible');
    });

    it('TC007: Should show error when both fields are empty', () => {
      loginPage.clickLogin();
      
      cy.wait(1000);
      cy.contains('Required').should('be.visible');
    });
  });

  describe('Negative Test - Invalid Credentials Tests', () => {
    it('TC008: Should show error with invalid credentials', () => {
      loginPage.login('InvalidUser', 'InvalidPass123');
      
      cy.wait(2000);
      cy.contains('Invalid credentials').should('be.visible');
    });

    it('TC009: Should verify no API redirect on invalid login', () => {
      cy.intercept('GET', '**/employees/action-summary').as('loginAPI');
      
      loginPage.login('InvalidUser', 'InvalidPass');
      
      cy.wait(2000);
      
      cy.contains('Invalid credentials').should('be.visible');
      
      cy.url().should('include', 'auth/login');
    });
  });

  describe('UI Elements Tests', () => {
    it('TC010: Should display all login page elements', () => {
      loginPage.verifyLoginPageVisible();
      loginPage.elements.UsernameInput().should('be.visible');
      loginPage.elements.PasswordInput().should('be.visible');
      loginPage.elements.LoginButton().should('be.visible');
      loginPage.elements.ForgotPasswordLink().should('be.visible');
    });

    it('TC011: Should navigate to forgot password page', () => {
      loginPage.clickForgotPassword();
      
      cy.wait(1000);
      cy.url().should('include', 'requestPasswordResetCode');
    });
  });

  describe('Login Performance Tests with Intercept', () => {
    it('TC012: Should complete login within acceptable time', () => {
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
    });
});
    
    describe('Additional Case', () => {
        it('TC013: Should handle username with spaces', () => {
        loginPage.login('  Admin  ', testData.validCredentials.password);
        
        cy.wait(2000);

        cy.url().then((url) => {
            if (url.includes('dashboard')) {
            dashboardPage.verifyDashboardVisible();
            } else {
            cy.contains('Invalid credentials').should('be.visible');
            }
        });
        });

        it('TC014: Should verify password is case sensitive', () => {

            loginPage.login(testData.validCredentials.username,'ADMIN123');
            cy.wait(2000);
            cy.contains('Invalid credentials').should('be.visible');
            cy.url().should('include', 'auth/login');
        });

        it('TC015: Should succeed login if username case is correct', () => {
            // login dengan username yang valid (case benar)
            loginPage.login('admin', testData.validCredentials.password);

            // pastikan login berhasil
            dashboardPage.verifyDashboardVisible();
            cy.url().should('include', '/dashboard');
            cy.log('✅ Login berhasil dengan username case benar');
        });

        it('TC016: Should handle rapid multiple login attempts', () => {
        // Attempt 1
        loginPage.login('InvalidUser1', 'InvalidPass1');
        cy.wait(1000);
        
        // Attempt 2
        loginPage.clearUsername();
        loginPage.clearPassword();
        loginPage.login('InvalidUser2', 'InvalidPass2');
        cy.wait(1000);
        
        // Attempt 3
        loginPage.clearUsername();
        loginPage.clearPassword();
        loginPage.login('InvalidUser3', 'InvalidPass3');
        cy.wait(2000);
        
        // Should still show error and not crash
        cy.contains('Invalid credentials').should('be.visible');
        cy.url().should('include', 'auth/login');
        
        // Verify form still functional
        loginPage.elements.UsernameInput().should('be.visible');
        loginPage.elements.PasswordInput().should('be.visible');
        });
    });
    });
    






