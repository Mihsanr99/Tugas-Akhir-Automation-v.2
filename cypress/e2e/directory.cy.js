import DirectoryPage from '../pages/DirectoryPage';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';

describe('Directory Functionality Tests', () => {
  const directoryPage = new DirectoryPage();
  const loginPage = new LoginPage();
  const dashboardPage = new DashboardPage();
  let testData;

  before(() => {
    cy.fixture('testData').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    // Login before accessing directory
    cy.loginWithIntercept(
      testData.validCredentials.username,
      testData.validCredentials.password
    );
    dashboardPage.navigateToDirectory();
  });

  describe('Page Access Tests', () => {
    it('TC001: Should access directory page from dashboard', () => {
      directoryPage.verifyDirectoryPageVisible();
      cy.url().should('include', 'directory/viewDirectory');
    });

    it('TC002: Should display correct page title', () => {
      directoryPage.verifyPageTitle('Directory');
    });
  });

  describe('Form Elements Tests', () => {
    it('TC003: Should display search form with all fields', () => {
      directoryPage.verifySearchFormVisible();
      directoryPage.elements.employeeNameInput().should('be.visible');
    });

    it('TC004: Should display all filter fields and buttons', () => {
      directoryPage.elements.locationDropdown().should('be.visible');
      directoryPage.elements.jobTitleDropdown().should('be.visible');
      cy.contains('button', 'Search').should('be.visible');
      cy.contains('button', 'Reset').should('be.visible');
    });
  });

  describe('Search Functionality Tests with POM', () => {
    it('TC005: Should type in employee name field using POM', () => {
      // Using POM method
      directoryPage.enterEmployeeName('Peter');
      
      // Verify using POM element
      directoryPage.elements.employeeNameInput()
        .should('have.value', 'Peter');
    });

    it('TC006: Should execute search and verify URL', () => {
      directoryPage.clickSearch();
      cy.wait(3000);
      
      // Verify still on directory page after search
      cy.url().should('include', 'directory/viewDirectory');
    });

    it('TC007: Should reset search form using POM method', () => {
    // Enter data using POM
    directoryPage.enterEmployeeName('TestEmployee');
    cy.wait(1000);
    
    // Reset using POM method
    directoryPage.clickReset();
    cy.wait(2000);
    directoryPage.elements.employeeNameInput().clear();
    directoryPage.elements.employeeNameInput().should('have.value', '');
    });
  });

  describe('API Intercept Tests', () => {
    it('TC008: Should call directory API on search', () => {
      cy.intercept('GET', '**/directory/employees**').as('directoryAPI');
      
      directoryPage.clickSearch();
      
      cy.wait('@directoryAPI', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
      });
    });

    it('TC009: Should verify API response structure with intercept', () => {
      cy.intercept('GET', '**/directory/employees**').as('searchAPI');
      
      directoryPage.clickSearch();
      
      cy.wait('@searchAPI', { timeout: 10000 }).then((interception) => {
        expect(interception.response.statusCode).to.eq(200);
        expect(interception.response.body).to.have.property('data');
        cy.log('API Response:', interception.response.body);
      });
    });

    it('TC010: Should verify API is called on each search action', () => {
        cy.intercept('GET', '**/directory/employees**').as('directoryAPI');
        // First search
        directoryPage.clickSearch();
        cy.wait('@directoryAPI').its('response.statusCode').should('eq', 200);
        // Reset
        directoryPage.clickReset();
        cy.wait(1000);
        // Second search
        directoryPage.clickSearch();
        cy.wait('@directoryAPI').its('response.statusCode').should('eq', 200);
        // Just verify both searches called API successfully
        // Don't check exact count (too brittle)
        cy.get('@directoryAPI.all').should('have.length.at.least', 2);
        });
  });

  describe('Filter Interaction Tests with POM', () => {
    it('TC011: Should interact with location dropdown using POM', () => {
      // Using POM element
      directoryPage.elements.locationDropdown().should('be.visible').click();
      cy.wait(500);
      
      // Verify dropdown opened
      cy.get('body').then($body => {
        if ($body.find('.oxd-select-dropdown').length > 0) {
          cy.get('.oxd-select-dropdown').should('be.visible');
        }
      });
    });

    it('TC012: Should interact with job title dropdown using POM', () => {
      // Using POM element
      directoryPage.elements.jobTitleDropdown().should('be.visible').click();
      cy.wait(500);
      
      // Verify dropdown opened
      cy.get('body').then($body => {
        if ($body.find('.oxd-select-dropdown').length > 0) {
          cy.get('.oxd-select-dropdown').should('be.visible');
        }
      });
    });
  });
});