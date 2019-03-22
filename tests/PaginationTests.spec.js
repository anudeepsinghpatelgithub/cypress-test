const ComputerPage = require('../pages/ComputersPage');
const NewComputersPage = require('../pages/NewComputersPage');
const Constants = require('../helpers/Constants');
const moment = require('moment');
const addEditFormat = 'YYYY-MM-DD';

describe('Pagination should be displayed if more than 10 computers tests', () => {
  const searchString = `computer-${new Date().getTime()}`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const company = 'Apple Inc.';
  let computers = [];
  for (let i = 1; i <= 15; i++) {
    computers.push(`${searchString}-${i}`);
  }
  before(function() {
    // Runs once before all tests in the block
    // Create 15 computers
    cy.visit(Constants.URL);
    computers.forEach(computer => {
      computerPage.clickOnAddComputerBtn();
      newComputerPage.createNewComputer(computer, introducedDate, discontinuedDate, company);
      computerPage
        .searchComputer(computer)
        .getComputerName(computer)
        .should('exist');
    });
  });
  after(() => {
    // Runs once before all tests in the block
    // Delete all the computers
    cy.visit(Constants.URL);
    computers.forEach(name => {
      computerPage.searchComputer(name);
      computerPage.clickOnCreatedComputer(name);
      newComputerPage.clickOnDeleteThisComputerBtn();
      computerPage.warnMessage(`Computer has been deleted`).should('exist');
    });
  });

  it(`Page forward test i.e. next button`, () => {
    cy.visit(Constants.URL);
    computerPage
      .searchComputer(searchString)
      .getComputerName(searchString)
      .should('exist');

    computerPage
      .prevBtnDisabled()
      .verifyPaginationText('Displaying 1 to 10 of 15')
      .clickOnNextBtn()
      .verifyPaginationText('Displaying 11 to 15 of 5')
      .prevBtnEnabled()
      .urlShouldHave(`/computers?p=1&f=${searchString}`)
      .nextBtnDisabled();
  });
  it(`Page previous test i.e. pervious button`, () => {
    computerPage
      .nextBtnDisabled()
      .verifyPaginationText('Displaying 11 to 15 of 5')
      .clickOnPrevBtn()
      .verifyPaginationText('Displaying 1 to 10 of 15')
      .nextBtnEnabled()
      .urlShouldHave(`computers?f=${searchString}`)
      .prevBtnDisabled();
  });
});

describe('Pagination should displayed if less than 10 computer but buttons should be disabled tests', () => {
  const searchString = `computer-${new Date().getTime()}`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const company = 'Apple Inc.';
  let computers = [];
  for (let i = 1; i <= 2; i++) {
    computers.push(`${searchString}-${i}`);
  }
  before(function() {
    // Runs once before all tests in the block
    // Create 15 computers
    cy.visit(Constants.URL);
    computers.forEach(computer => {
      computerPage.clickOnAddComputerBtn();
      newComputerPage.createNewComputer(computer, introducedDate, discontinuedDate, company);
      computerPage
        .searchComputer(computer)
        .getComputerName(computer)
        .should('exist');
    });
  });
  after(() => {
    // Runs once before all tests in the block
    // Delete all the computers
    cy.visit(Constants.URL);
    computers.forEach(name => {
      computerPage.searchComputer(name);
      computerPage.clickOnCreatedComputer(name);
      newComputerPage.clickOnDeleteThisComputerBtn();
      computerPage.warnMessage(`Computer has been deleted`).should('exist');
    });
  });

  it(`Previous and next button should be disabled`, () => {
    cy.visit(Constants.URL);
    computerPage
      .searchComputer(searchString)
      .getComputerName(searchString)
      .should('exist');

    computerPage
      .prevBtnDisabled()
      .verifyPaginationText('Displaying 1 to 2 of 2')
      .nextBtnDisabled();
  });
});
