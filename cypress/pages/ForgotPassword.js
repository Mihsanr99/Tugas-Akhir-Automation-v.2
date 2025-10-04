class ForgotPasswordPage {
    elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    resetButton: () => cy.get('button[type="submit"]'),
    cancelButton: () => cy.get('button[type="button"]').contains('Cancel'),
    pageTitle: () => cy.get('.orangehrm-forgot-password-title'),
    pageDescription: () => cy.get('.orangehrm-forgot-password-wrapper p').first(),
    successMessage: () => cy.get('.orangehrm-forgot-password-wrapper h6'),
    formContainer: () => cy.get('.orangehrm-forgot-password-container'),
    inputRequired: () => cy.get('.oxd-input-field-error-message'),
    usernameLabel: () => cy.get('label').contains('Username'),
    backToLoginLink: () => cy.get('.orangehrm-login-forgot-header'),
    forgotPasswordForm: () => cy.get('.orangehrm-forgot-password-form')
  };
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode');
    cy.wait(1000);
  }

  enterUsername(username) {
    this.elements.usernameInput().clear().type(username);
    return this;
  }

  clickReset() {
    this.elements.resetButton().click();
  }

  clickCancel() {
    this.elements.cancelButton().click();
  }

  clearUsername() {
    this.elements.usernameInput().clear();
  }


  verifyForgotPasswordPageVisible() {
    this.elements.formContainer().should('be.visible');
    this.elements.pageTitle().should('contain.text', 'Reset Password');
  }

  verifyPageTitle(title) {
    this.elements.pageTitle().should('contain.text', title);
  }

  verifyDescriptionVisible() {
    this.elements.pageDescription().should('be.visible');
  }

  verifySuccessMessage() {
  cy.wait(3000);
  cy.contains('Reset Password link sent successfully', { timeout: 10000 })
    .should('be.visible');
}

  verifyRequiredFieldError() {
    this.elements.inputRequired().should('be.visible').and('contain.text', 'Required');
  }

  verifyUsernameFieldEmpty() {
    this.elements.usernameInput().should('have.value', '');
  }

  verifyResetButtonEnabled() {
    this.elements.resetButton().should('be.enabled');
  }

  verifyCancelButtonVisible() {
    this.elements.cancelButton().should('be.visible');
  }


  resetPassword(username) {
    this.enterUsername(username);
    this.clickReset();
  }

  getUsernameField() {
    return this.elements.usernameInput();
  }
}
export default ForgotPasswordPage;