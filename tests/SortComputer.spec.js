const ComputerPage = require('../pages/ComputersPage');
const NewComputersPage = require('../pages/NewComputersPage');
const Constants = require('../helpers/Constants');
const moment = require('moment');
const addEditFormat = 'YYYY-MM-DD';
const displayFormat = 'DD MMM YYYY';
const using = require('jasmine-data-provider');

describe('Sorting tests', () => {
  const name = `computer-${new Date().getTime()}-1`;
  const name2 = `computer-${new Date().getTime()}-2`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const introducedDateDisplay = moment(introducedDate, addEditFormat).format(displayFormat);
  const discontinuedDateDisplay = moment(discontinuedDate, addEditFormat).format(displayFormat);
  const company = 'Apple Inc.';
  before(function() {
    // Runs once before all tests in the block
    // Create 2 computers
    // cy.visit(Constants.URL);
    // computerPage.clickOnAddComputerBtn();
    // newComputerPage.createNewComputer(name, introducedDate, discontinuedDate, company);
    // computerPage
    //   .searchComputer(name)
    //   .getComputerName(name)
    //   .should('exist');
    // computerPage.clickOnAddComputerBtn();
    // newComputerPage.createNewComputer(name2, introducedDate, discontinuedDate, company);
    // computerPage
    //   .searchComputer(name2)
    //   .getComputerName(name2)
    //   .should('exist');
  });
  after(() => {
    // Runs once before all tests in the block
    // Delete all the computers
    // cy.visit(Constants.URL);
    // computerPage.searchComputer(name);
    // computerPage.clickOnCreatedComputer(name);
    // newComputerPage.clickOnDeleteThisComputerBtn();
    // computerPage.warnMessage(`Computer has been deleted`).should('exist');
    // computerPage.searchComputer(name2);
    // computerPage.clickOnCreatedComputer(name2);
    // newComputerPage.clickOnDeleteThisComputerBtn();
    // computerPage.warnMessage(`Computer has been deleted`).should('exist');
  });

  it(`Sort by name`, () => {
    cy.visit(Constants.URL);
    const searchString = 'computer-1553242560829';

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
});
