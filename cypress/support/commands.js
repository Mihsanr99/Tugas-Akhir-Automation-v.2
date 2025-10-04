// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.wait(2000);
});


Cypress.Commands.add('loginWithIntercept', (username, password) => {
  cy.intercept('GET', '**/employees/action-summary').as('loginAPI');
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.wait('@loginAPI');
});


Cypress.Commands.add('navigateToDirectory', () => {
  cy.get('.oxd-main-menu-item').contains('Directory').click();
  cy.wait(2000);
});


Cypress.Commands.add('logout', () => {
  cy.get('.oxd-userdropdown').click();
  cy.wait(500);
  cy.get('a[href="/web/index.php/auth/logout"]').click();
});


Cypress.Commands.add('waitForElement', (selector, timeout = 10000) => {
  cy.get(selector, { timeout }).should('be.visible');
});


Cypress.Commands.add('elementExists', (selector) => {
  cy.get('body').then($body => {
    return $body.find(selector).length > 0;
  });
});


Cypress.Commands.add('clearSession', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});


Cypress.Commands.add('setupAPIIntercepts', () => {
  cy.intercept('GET', '**/employees/action-summary').as('employeesSummary');
  cy.intercept('GET', '**/directory/employees**').as('directoryEmployees');
  cy.intercept('POST', '**/auth/validate').as('loginValidate');
  cy.intercept('POST', '**/auth/requestResetPassword').as('resetPassword');
});


Cypress.Commands.add('verifyUrlContains', (text) => {
  cy.url().should('include', text);
});


Cypress.Commands.add('typeSlowly', { prevSubject: 'element' }, (subject, text, delay = 100) => {
  cy.wrap(subject).type(text, { delay });
});


Cypress.Commands.add('getByTestId', (testId) => {
  cy.get(`[data-testid="${testId}"]`);
});


Cypress.Commands.add('verifyAPISuccess', (alias) => {
  cy.wait(`@${alias}`).its('response.statusCode').should('eq', 200);
});


Cypress.Commands.add('captureScreenshot', (name) => {
  cy.screenshot(name, { capture: 'fullPage' });
});