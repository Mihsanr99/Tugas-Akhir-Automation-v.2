class DirectoryPage {

  elements = {
    pageTitle: () => cy.get('.oxd-topbar-header-breadcrumb h6'),
    employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]').first(),
    locationDropdown: () => cy.get('.oxd-select-text').eq(0),
    jobTitleDropdown: () => cy.get('.oxd-select-text').eq(1),
    searchButton: () => cy.get('button[type="submit"]'),
    resetButton: () => cy.contains('button', 'Reset', { timeout: 10000 }),
    employeeCards: () => cy.get('.orangehrm-directory-card'),
    employeeCardContainer: () => cy.get('.orangehrm-container'),
    recordsFound: () => cy.get('.orangehrm-horizontal-padding span'),
    noRecordsFound: () => cy.get('.orangehrm-directory-card-body').contains('No Records Found'),
    dropdownOptions: () => cy.get('.oxd-select-dropdown'),
    employeeName: () => cy.get('.orangehrm-directory-card-header'),
    employeeJobTitle: () => cy.get('.orangehrm-directory-card-subtitle'),
    autocompleteDropdown: () => cy.get('.oxd-autocomplete-dropdown'),
    autocompleteOption: () => cy.get('.oxd-autocomplete-option'),
    locationLabel: () => cy.contains('label', 'Location'),
    jobTitleLabel: () => cy.contains('label', 'Job Title'),
    formCard: () => cy.get('.orangehrm-paper-container'),
    directoryGrid: () => cy.get('.orangehrm-container')
  };

 
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    cy.wait(2000);
  }

  enterEmployeeName(name) {
    this.elements.employeeNameInput().clear().type(name);
    cy.wait(1000); 
    return this;
  }

  selectEmployeeFromAutocomplete(name) {
    this.elements.autocompleteOption().contains(name).click();
    return this;
  }

  selectLocation(location) {
    this.elements.locationDropdown().click();
    cy.wait(500);
    this.elements.dropdownOptions().contains(location).click();
    return this;
  }

  selectJobTitle(jobTitle) {
    this.elements.jobTitleDropdown().click();
    cy.wait(500);
    this.elements.dropdownOptions().contains(jobTitle).click();
    return this;
  }

  clickSearch() {
    this.elements.searchButton().click();
    cy.wait(2000); 
  }

  clickReset() {
    this.elements.resetButton().click();
    cy.wait(1000);
  }

  clearEmployeeName() {
    this.elements.employeeNameInput().clear();
  }


  verifyDirectoryPageVisible() {
    this.elements.pageTitle().should('be.visible').and('contain.text', 'Directory');
  }

  verifyPageTitle(title) {
    this.elements.pageTitle().should('contain.text', title);
  }

  verifySearchFormVisible() {
    this.elements.formCard().should('be.visible');
  }

  verifyEmployeeCardsVisible() {
    this.elements.employeeCards().should('be.visible');
  }

  verifyNumberOfEmployeeCards(count) {
    this.elements.employeeCards().should('have.length', count);
  }

  verifyAtLeastOneEmployeeCard() {
    this.elements.employeeCards().should('have.length.greaterThan', 0);
  }

  verifyNoRecordsFound() {
    this.elements.noRecordsFound().should('be.visible');
  }

  verifyRecordsFoundText() {
    this.elements.recordsFound().should('be.visible');
  }

  verifyAutocompleteVisible() {
    this.elements.autocompleteDropdown().should('be.visible');
  }

  verifyLocationDropdownEnabled() {
    this.elements.locationDropdown().should('be.visible');
  }

  verifyJobTitleDropdownEnabled() {
    this.elements.jobTitleDropdown().should('be.visible');
  }

  verifySearchButtonEnabled() {
    this.elements.searchButton().should('be.enabled');
  }

  verifyResetButtonEnabled() {
    this.elements.resetButton().should('be.visible');
  }

  verifyEmployeeCardContainsName(name) {
    this.elements.employeeName().should('contain.text', name);
  }


  searchEmployee(name) {
    this.enterEmployeeName(name);
    cy.wait(1000);
    this.elements.autocompleteOption().first().click();
    this.clickSearch();
  }

  searchByLocation(location) {
    this.selectLocation(location);
    this.clickSearch();
  }

  searchByJobTitle(jobTitle) {
    this.selectJobTitle(jobTitle);
    this.clickSearch();
  }

  searchWithFilters(name, location, jobTitle) {
    if (name) {
      this.enterEmployeeName(name);
      cy.wait(1000);
      this.elements.autocompleteOption().first().click();
    }
    if (location) this.selectLocation(location);
    if (jobTitle) this.selectJobTitle(jobTitle);
    this.clickSearch();
  }

  getEmployeeCards() {
    return this.elements.employeeCards();
  }

  getRecordsCount() {
    return this.elements.employeeCards().its('length');
  }

  resetSearch() {
    this.clickReset();
  }
}

export default DirectoryPage;