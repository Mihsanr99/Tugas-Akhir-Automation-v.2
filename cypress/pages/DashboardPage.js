class DashboardPage {
  
  elements = {
    dashboardTitle: () => cy.get('.oxd-topbar-header-breadcrumb h6'),
    sideMenu: () => cy.get('.oxd-sidepanel'),
    directoryMenuItem: () => cy.get('.oxd-main-menu-item').contains('Directory'),
    userDropdown: () => cy.get('.oxd-userdropdown'),
    userName: () => cy.get('.oxd-userdropdown-name'),
    logoutButton: () => cy.get('a[href="/web/index.php/auth/logout"]'),
    timeAtWorkWidget: () => cy.get('.orangehrm-dashboard-widget').contains('Time at Work'),
    quickLaunchWidget: () => cy.get('.orangehrm-dashboard-widget').contains('Quick Launch'),
    employeeDistributionWidget: () => cy.get('.orangehrm-dashboard-widget').contains('Employee Distribution'),
    searchBox: () => cy.get('input[placeholder="Search"]'),
    mainMenu: () => cy.get('.oxd-main-menu'),
    topbar: () => cy.get('.oxd-topbar'),
    breadcrumb: () => cy.get('.oxd-topbar-header-breadcrumb'),
    dashboardGrid: () => cy.get('.orangehrm-dashboard-grid')
  };


  clickDirectory() {
    this.elements.directoryMenuItem().click();
    cy.wait(2000); 
  }

  clickUserDropdown() {
    this.elements.userDropdown().click();
  }

  clickLogout() {
    this.clickUserDropdown();
    cy.wait(500);
    this.elements.logoutButton().click();
  }

  searchInMenu(text) {
    this.elements.searchBox().type(text);
  }


  verifyDashboardVisible() {
    return this.elements.dashboardTitle().should('be.visible').and('contain.text', 'Dashboard');
  }

  verifyDashboardTitle(title) {
    this.elements.dashboardTitle().should('contain.text', title);
  }

  verifySideMenuVisible() {
    this.elements.sideMenu().should('be.visible');
  }

  verifyDirectoryMenuItemVisible() {
    this.elements.directoryMenuItem().should('be.visible');
  }

  verifyUserNameVisible() {
    this.elements.userName().should('be.visible');
  }

  verifyWidgetsVisible() {
    this.elements.dashboardGrid().should('be.visible');
  }

  verifyTopbarVisible() {
    this.elements.topbar().should('be.visible');
  }

 
  navigateToDirectory() {
    this.clickDirectory();
  }

  waitForDashboardLoad() {
    this.elements.dashboardTitle().should('be.visible');
    cy.wait(1000);
  }
}

export default DashboardPage;