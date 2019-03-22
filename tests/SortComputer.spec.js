const ComputerPage = require('../pages/ComputersPage');
const NewComputersPage = require('../pages/NewComputersPage');
const Constants = require('../helpers/Constants');
const moment = require('moment');
const addEditFormat = 'YYYY-MM-DD';
const displayFormat = 'DD MMM YYYY';
const using = require('jasmine-data-provider');

describe('Sorting tests', () => {
  const searchString = `computer-${new Date().getTime()}`;
  const name = `${searchString}-1`;
  const name2 = `${searchString}-2`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const company = 'Apple Inc.';
  before(function() {
    // Runs once before all tests in the block
    // Create 2 computers
    cy.visit(Constants.URL);
    computerPage.clickOnAddComputerBtn();
    newComputerPage.createNewComputer(name, introducedDate, discontinuedDate, company);
    computerPage
      .searchComputer(name)
      .getComputerName(name)
      .should('exist');
    computerPage.clickOnAddComputerBtn();
    newComputerPage.createNewComputer(name2, introducedDate, discontinuedDate, company);
    computerPage
      .searchComputer(name2)
      .getComputerName(name2)
      .should('exist');
  });
  after(() => {
    // Runs once before all tests in the block
    // Delete all the computers
    cy.visit(Constants.URL);
    computerPage.searchComputer(name);
    computerPage.clickOnCreatedComputer(name);
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');
    computerPage.searchComputer(name2);
    computerPage.clickOnCreatedComputer(name2);
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');
  });

  it(`Sort by name`, () => {
    cy.visit(Constants.URL);

    computerPage
      .searchComputer(searchString)
      .getComputerName(searchString)
      .should('exist');

    computerPage.sortByName();
    computerPage.getAllComputerName().each($el => {
      console.log(cy.wrap($el).invoke('text'));
    });

    // TODO: need to add validation for actual content is sorted or not.
  });

  it(`Sort by Introduced`, () => {
    cy.visit(Constants.URL);

    computerPage
      .searchComputer(searchString)
      .getComputerName(searchString)
      .should('exist');

    computerPage.sortBy('Introduced');

    // TODO: need to add validation for actual content is sorted or not.
  });

  it(`Sort by Discontinued`, () => {
    cy.visit(Constants.URL);
    computerPage
      .searchComputer(searchString)
      .getComputerName(searchString)
      .should('exist');

    computerPage.sortBy('Discontinued');

    // TODO: need to add validation for actual content is sorted or not.
  });

  it(`Sort by Company`, () => {
    cy.visit(Constants.URL);

    computerPage
      .searchComputer(searchString)
      .getComputerName(searchString)
      .should('exist');

    computerPage.sortBy('Company');

    // TODO: need to add validation for actual content is sorted or not.
  });
});
