class LoginPage {
    elements = {
        UsernameInput: () => cy.get('input[name="username"]'),
        PasswordInput: () => cy.get('input[name="password"'),
        LoginButton: () => cy.get('button[type="submit"]'),
        errorMessage: () => cy.get('.oxd-alert-content-text'),
        ForgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
        loginContainer: () => cy.get('.orangehrm-login-container'),
        loginTitle: () => cy.get('.orangehrm-login-title'),
        credentialsHint: () => cy.get('.orangehrm-demo-credentials'),
        usernameLabel: () => cy.get('label').contains('Username'),
        passwordLabel: () => cy.get('label').contains('Password'),
        inputRequired: () => cy.get('.oxd-input-field-error-message'),
        loginLogo: () => cy.get('.orangehrm-login-branding img'),
        loginSlot: () => cy.get('.orangehrm-login-slot')
    };
    visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.wait(1000);
  }

  enterUsername(username) {
    this.elements.UsernameInput().clear().type(username);
    return this;
  }

  enterPassword(password) {
    this.elements.PasswordInput().clear().type(password);
    return this;
  }

  clickLogin() {
    this.elements.LoginButton().click();
  }

  clickForgotPassword() {
    this.elements.ForgotPasswordLink().click();
  }

  clearUsername() {
    this.elements.UsernameInput().clear();
  }

  clearPassword() {
    this.elements.PasswordInput().clear();
  }


  verifyLoginPageVisible() {
    this.elements.loginContainer().should('be.visible');
    this.elements.loginTitle().should('contain.text', 'Login');
  }

  verifyErrorMessage(message) {
     cy.wait(2000);
     this.elements.errorMessage().should('be.visible', {timeout: 10000}).and('contain.text', message);
  }

  verifyRequiredFieldError() {
    this.elements.inputRequired().should('be.visible').and('contain.text', 'Required');
  }

  verifyUsernameFieldEmpty() {
    this.elements.UsernameInput().should('have.value', '');
  }

  verifyPasswordFieldEmpty() {
    this.elements.PasswordInput().should('have.value', '');
  }

  verifyCredentialsHintVisible() {
    this.elements.credentialsHint().should('be.visible');
  }

  verifyLogoVisible() {
    this.elements.loginLogo().should('be.visible');
  }

  // Helper Methods
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  getUsername() {
    return this.elements.UsernameInput();
  }

  getPassword() {
    return this.elements.PasswordInput();
  }
}
export default LoginPage;