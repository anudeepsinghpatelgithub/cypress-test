const ComputerPage = require('../pages/ComputersPage');
const NewComputersPage = require('../pages/NewComputersPage');
const Constants = require('../helpers/Constants');
const moment = require('moment');
const addEditFormat = 'YYYY-MM-DD';
const displayFormat = 'DD MMM YYYY';
const using = require('jasmine-data-provider');

describe('CRUD operations for computers with all valid details', () => {
  // Create information
  const name = `computer-${new Date().getTime()}`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const introducedDateDisplay = moment(introducedDate, addEditFormat).format(displayFormat);
  const discontinuedDateDisplay = moment(discontinuedDate, addEditFormat).format(displayFormat);
  const company = 'Apple Inc.';
  // Edit information:
  const nameEdited = name + 'edited';
  const introducedDateEdit = moment(introducedDate, addEditFormat)
    .subtract(1, 'months')
    .format(addEditFormat);
  const discontinuedDateEdit = moment(introducedDateEdit, addEditFormat)
    .add(2, 'years')
    .format(addEditFormat);
  const introducedDateDisplayEdit = moment(introducedDateEdit, addEditFormat).format(displayFormat);
  const discontinuedDateDisplayEdit = moment(discontinuedDateEdit, addEditFormat).format(displayFormat);
  const companyEdit = 'IBM';

  it('Should be able to add new comupter', () => {
    cy.visit(Constants.URL);

    computerPage.clickOnAddComputerBtn();
    // Create new computer
    newComputerPage
      .fillName(name)
      .fillIntroduced(introducedDate)
      .fillDiscontinued(discontinuedDate)
      .selectCompany(company)
      .clickOnCreateThisComputerButton();
    computerPage.warnMessage(`Computer ${name} has been created`).should('exist');
  });

  it('Should be able to search created computer', () => {
    // Search for created comuter
    computerPage
      .searchComputer(name)
      .getComputerName(name)
      .should('exist');
  });

  it('Verify created computer details present in computers page', () => {
    // Verify created compute details
    computerPage.getComputerName(name).should('exist');
    computerPage.getIntroducedDate(introducedDateDisplay).should('exist');
    computerPage.getDiscontinuedDate(discontinuedDateDisplay).should('exist');
    computerPage.getCompany(company).should('exist');
  });

  it('Should be able to edit the created computer', () => {
    // Click on created computer and edit the details
    computerPage.getComputerName(name).click();
    newComputerPage
      .fillName(nameEdited)
      .fillIntroduced(introducedDateEdit)
      .fillDiscontinued(discontinuedDateEdit)
      .selectCompany(companyEdit)
      .clickOnSaveThisComputer();
    computerPage.warnMessage(`Computer ${nameEdited} has been updated`).should('exist');
  });

  it('Search for updated computer', () => {
    // Search for created comuter
    computerPage
      .searchComputer(nameEdited)
      .getComputerName(nameEdited)
      .should('exist');
  });

  it('Verify updated computer details present in computers page', () => {
    // Verify created compute details
    computerPage.getComputerName(nameEdited).should('exist');
    computerPage.getIntroducedDate(introducedDateDisplayEdit).should('exist');
    computerPage.getDiscontinuedDate(discontinuedDateDisplayEdit).should('exist');
    computerPage.getCompany(companyEdit).should('exist');
  });

  it('Should be able to delete the created copmuter', () => {
    computerPage.getComputerName(nameEdited).click();
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');
  });
});

describe('Create computres only just providing name', () => {
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const name = `computer-${new Date().getTime()}`;
  afterEach(() => {
    computerPage
      .searchComputer(name)
      .getComputerName(name)
      .should('exist')
      .click();
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');
  });
  it('Should be able to add new comupter', () => {
    cy.visit(Constants.URL);

    computerPage.clickOnAddComputerBtn();
    // Create new computer
    newComputerPage.fillName(name).clickOnCreateThisComputerButton();
    computerPage.warnMessage(`Computer ${name} has been created`).should('exist');
  });
});

describe(`Create computres with diffrent type of characters and 
should be able to select different companies`, () => {
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const introducedDateDisplay = moment(introducedDate, addEditFormat).format(displayFormat);
  const discontinuedDateDisplay = moment(discontinuedDate, addEditFormat).format(displayFormat);

  const dp = {
    chinese: {
      name: `汉字漢字${new Date().getTime()}`,
      company: 'OQO'
    },
    japanese: {
      name: `学校${new Date().getTime()}`,
      company: 'Micro Instrumentation and Telemetry Systems'
    },
    french: {
      name: `ùà${new Date().getTime()}`,
      company: 'E.S.R. Inc.'
    },
    german: {
      name: `Ä/ä, Ö/ö, Ü/ü${new Date().getTime()}`,
      company: 'Samsung Electronics'
    }
  };
  // Running same tests multiple time with different data set
  using(dp, (data, description) => {
    it(`Should be able to add new comupter with ${description} characters`, () => {
      cy.visit(Constants.URL);

      computerPage.clickOnAddComputerBtn();
      // Create new computer
      newComputerPage.createNewComputer(data.name, introducedDate, discontinuedDate, data.company);

      computerPage.warnMessage(`Computer ${data.name} has been created`).should('exist');
      computerPage
        .searchComputer(data.name)
        .getComputerName(data.name)
        .should('exist');
      computerPage.getIntroducedDate(introducedDateDisplay).should('exist');
      computerPage.getDiscontinuedDate(discontinuedDateDisplay).should('exist');
      computerPage;
      computerPage.getCompany(data.company).should('exist');
      computerPage.getComputerName(data.name).click();

      newComputerPage.clickOnDeleteThisComputerBtn();
      computerPage.warnMessage(`Computer has been deleted`).should('exist');
    });
  });
});

describe('Computer Search tests', () => {
  const name = `computer-${new Date().getTime()}`;
  const name2 = `${name}2`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const introducedDateDisplay = moment(introducedDate, addEditFormat).format(displayFormat);
  const discontinuedDateDisplay = moment(discontinuedDate, addEditFormat).format(displayFormat);
  const company = 'Apple Inc.';

  it(`Search the computer which doesn't exist`, () => {
    // Create a computer and search
    cy.visit(Constants.URL);
    computerPage.searchComputer(`Some dummay name${new Date().getTime()}`);
    cy.contains(`Nothing to display`).should('exist');
  });

  it(`Search the computers more than 1 result found`, () => {
    // Create a computer and search
    cy.visit(Constants.URL);
    computerPage.clickOnAddComputerBtn();
    newComputerPage.createNewComputer(name, introducedDate, discontinuedDate, company);
    computerPage.clickOnAddComputerBtn();
    newComputerPage.createNewComputer(name2, introducedDate, discontinuedDate, company);
    computerPage.searchComputer(name);
    computerPage.validateSearchMessage(`2 computers found`).should('exist');

    computerPage.searchComputer(name);
    computerPage.clickOnCreatedComputer(name);
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');

    computerPage.searchComputer(name2);
    computerPage.clickOnCreatedComputer(name2);
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');
  });
});

describe('Create Computer name wih duplicate information', () => {
  const name = `computer-${new Date().getTime()}`;
  const computerPage = new ComputerPage();
  const newComputerPage = new NewComputersPage();
  const introducedDate = moment(new Date(), addEditFormat).format(addEditFormat);
  const discontinuedDate = moment(new Date(), addEditFormat)
    .add(1, 'years')
    .format(addEditFormat);
  const introducedDateDisplay = moment(introducedDate, addEditFormat).format(displayFormat);
  const discontinuedDateDisplay = moment(discontinuedDate, addEditFormat).format(displayFormat);
  const company = 'Apple Inc.';
  it(`Create 2 computers with same name`, () => {
    // Create a computer and search
    cy.visit(Constants.URL);
    computerPage.clickOnAddComputerBtn();
    newComputerPage.createNewComputer(name, introducedDate, discontinuedDate, company);
    computerPage.clickOnAddComputerBtn();
    newComputerPage.createNewComputer(name, introducedDate, discontinuedDate, company);

    computerPage.searchComputer(name);
    computerPage.validateSearchMessage(`2 computers found`).should('exist');
    computerPage.getAllComputerName(name).should('have.length', 2);
    computerPage.searchComputer(name);
    computerPage.clickOnCreatedComputer(name);
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');

    computerPage.searchComputer(name);
    computerPage.clickOnCreatedComputer(name);
    newComputerPage.clickOnDeleteThisComputerBtn();
    computerPage.warnMessage(`Computer has been deleted`).should('exist');
  });
});
