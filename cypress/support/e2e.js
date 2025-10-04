// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';


Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});


beforeEach(() => {

  cy.clearCookies();
  cy.clearLocalStorage();
  
  cy.viewport(1280, 720);
});


afterEach(function() {
  if (this.currentTest.state === 'failed') {
    cy.screenshot(`${this.currentTest.title} - FAILED`);
  }
});

Cypress.on('fail', (error, runnable) => {
  console.error('Test failed:', error.message);
  throw error;
});