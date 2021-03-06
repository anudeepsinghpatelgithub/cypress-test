const NewComputerPage = require('./NewComputersPage');
class ComputersPage {
  clickOnAddComputerBtn() {
    const addComputerBtn = cy.get(`[id="add"]`);
    addComputerBtn.click();
  }

  getComputerName(name) {
    return cy.contains('a', name);
  }
  getAllComputerName() {
    return cy
      .get('.computers')
      .find('td')
      .find('a');
  }

  getIntroducedDate(date) {
    return cy.contains('td', date);
  }

  getDiscontinuedDate(date) {
    return cy.contains('td', date);
  }

  getCompany(name) {
    return cy.contains('td', name);
  }
  clickOnSearchBtn() {
    const searchBtn = cy.get(`[id="searchsubmit"]`);
    searchBtn.click();
  }

  searchComputer(name) {
    const searchInput = cy.get(`[id="searchbox"]`);
    searchInput.clear().type(name);
    this.clickOnSearchBtn();
    return this;
  }

  clickOnCreatedComputer(name) {
    const computerLink = this.getComputerName(name);
    computerLink.click();
  }

  warnMessage(message) {
    return cy.contains(message);
  }

  validateSearchMessage(message) {
    return cy.get('h1').contains(message);
  }

  sortByName() {
    cy.contains('a', 'Computer name')
      .parent()
      .should('have.class', 'headerSortUp');
    cy.contains('a', 'Computer name').click();
    cy.contains('a', 'Computer name')
      .parent()
      .should('have.class', 'headerSortDown');
  }

  sortBy(name) {
    cy.contains('a', name)
      .parent()
      .should('not.have.class', 'headerSortUp');
    cy.contains('a', name).click();
    cy.contains('a', name)
      .parent()
      .should('have.class', 'headerSortUp');
    cy.contains('a', name).click();
    cy.contains('a', name)
      .parent()
      .should('have.class', 'headerSortDown');
  }

  prevBtnDisabled() {
    cy.contains('a', '← Previous')
      .parent()
      .should('have.class', 'prev disabled');
    return this;
  }
  prevBtnEnabled() {
    cy.contains('a', '← Previous')
      .parent()
      .should('not.have.class', 'prev disabled');
    return this;
  }

  verifyPaginationText(text) {
    cy.contains('a', text).should('exist');
    return this;
  }

  clickOnNextBtn() {
    cy.contains('a', 'Next →').click();
    return this;
  }
  clickOnPrevBtn() {
    cy.contains('a', '← Previous').click();
    return this;
  }

  urlShouldHave(partialUrl) {
    cy.url().should('include', partialUrl);
    return this;
  }

  nextBtnDisabled() {
    cy.contains('a', 'Next →')
      .parent()
      .should('have.class', 'next disabled');
    return this;
  }
  nextBtnEnabled() {
    cy.contains('a', 'Next →')
      .parent()
      .should('not.have.class', 'next disabled');
    return this;
  }
}
module.exports = ComputersPage;
