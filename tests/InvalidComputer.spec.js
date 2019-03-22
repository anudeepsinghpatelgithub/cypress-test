const Constants = require('../helpers/Constants');
const ComputerPage = require('../pages/ComputersPage');
const NewComputersPage = require('../pages/NewComputersPage');

describe('Try to create computer with empty values and invalid date formats', () => {
  const newComputerPage = new NewComputersPage();
  const computerPage = new ComputerPage();

  it('No form values provied', () => {
    cy.visit(Constants.URL);
    computerPage.clickOnAddComputerBtn();
    // Create new computer
    newComputerPage.clickOnCreateThisComputerButton();
    newComputerPage.nameError().should('exist');
  });

  it('Invalid introduced date format provided', () => {
    // Create new computer
    newComputerPage.fillIntroduced('dddd').clickOnCreateThisComputerButton();
    newComputerPage.introducedError().should('exist');
  });

  it('Invalid discontinued date format provided', () => {
    // Create new computer
    newComputerPage.fillDiscontinued('dddd').clickOnCreateThisComputerButton();
    newComputerPage.discontinuedError().should('exist');
  });
});
