import ForgotPasswordPage from '../pages/ForgotPassword';
import LoginPage from '../pages/LoginPage';

describe('Forgot Password Functionality Tests', () => {
  const forgotPasswordPage = new ForgotPasswordPage();
  const loginPage = new LoginPage();
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    forgotPasswordPage.visit();
  });

  describe('Page Display Tests', () => {
    it('TC001: Should display forgot password page correctly', () => {
      forgotPasswordPage.verifyForgotPasswordPageVisible();
      forgotPasswordPage.verifyPageTitle('Reset Password');
    });

    it('TC002: Should display all form elements', () => {
      forgotPasswordPage.elements.usernameInput().should('be.visible');
      cy.contains('button', 'Reset Password').should('be.visible');
      cy.contains('button', 'Cancel').should('be.visible');
    });
  });

  describe('Form Submission Tests with Intercept', () => {
     it('TC003: Should submit reset password form with valid username', () => {
    cy.intercept('POST', testData.apiEndpoints.resetPassword).as('resetRequest');
    
    forgotPasswordPage.enterUsername(testData.forgotPassword.validUsername);
    forgotPasswordPage.clickReset();

    // Tunggu request
    cy.wait('@resetRequest', { timeout: 10000 })
      .its('response.statusCode')
      .should('be.oneOf', [200, 302]);

    // Tidak ada error message
    cy.get('.oxd-input-field-error-message').should('not.exist');

    // Pastikan diarahkan ke halaman "sendPasswordReset"
    cy.url().should('include', 'sendPasswordReset');

    // Verifikasi pesan sukses
    forgotPasswordPage.verifySuccessMessage();
  });

    it('TC004: Should verify reset password process via API (if intercepted) and UI', () => {
      cy.intercept('POST', testData.apiEndpoints.resetPassword).as('resetAPI');
      
      forgotPasswordPage.enterUsername(testData.forgotPassword.validUsername);
      forgotPasswordPage.clickReset();
      
      cy.wait('@resetAPI', { timeout: 10000 })
        .then((interception) => {
        if (interception) {
          expect(interception.response.statusCode).to.be.oneOf([200, 302]);
        } else {
          cy.log(' No API call detected, relying on redirect check only');
        }
      });

      cy.url().should('include', 'sendPasswordReset');
      forgotPasswordPage.verifySuccessMessage();
    });

    it('TC005: Should show error when username is empty', () => {
      forgotPasswordPage.clickReset();
      
      cy.wait(1000);
      cy.contains('Required').should('be.visible');
    });

    it('TC006: Should not call API when username is empty', () => {
      cy.intercept('POST', '**/auth/requestResetPassword').as('resetAPI');
      
      forgotPasswordPage.clickReset();
      
      cy.wait(1000);
      
      // Error should appear
      cy.contains('Required').should('be.visible');
      
      // API should not be called
      cy.get('@resetAPI.all').should('have.length', 0);
    });
  });

  describe('Navigation Tests', () => {
    it('TC007: Should navigate back to login using cancel button', () => {
      forgotPasswordPage.clickCancel();
      
      cy.wait(1000);
      cy.url().should('include', 'auth/login');
      loginPage.verifyLoginPageVisible();
    });

    it('TC008: Should navigate from login page to forgot password', () => {
      loginPage.visit();
      loginPage.clickForgotPassword();
      
      cy.wait(1000);
      cy.url().should('include', 'requestPasswordResetCode');
      forgotPasswordPage.verifyForgotPasswordPageVisible();
    });
  });

  describe('Form Interaction Tests with POM', () => {
    it('TC009: Should clear username field and re-enter', () => {
      // Using POM methods
      forgotPasswordPage.enterUsername('FirstUser');
      forgotPasswordPage.elements.usernameInput().should('have.value', 'FirstUser');
      
      forgotPasswordPage.clearUsername();
      forgotPasswordPage.elements.usernameInput().should('have.value', '');
      
      forgotPasswordPage.enterUsername('SecondUser');
      forgotPasswordPage.elements.usernameInput().should('have.value', 'SecondUser');
    });

    it('TC010: Should verify form state after navigation', () => {
      forgotPasswordPage.enterUsername('TestUser');
      forgotPasswordPage.clickCancel();
      
      cy.wait(1000);
      loginPage.clickForgotPassword();
      cy.wait(1000);
      
      // Field should be empty after navigation
      forgotPasswordPage.elements.usernameInput().should('have.value', '');
    });
  });
});
