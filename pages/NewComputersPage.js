class NewComputerPage {
  fillName(value) {
    const nameInput = cy.get(`[id="name"]`);
    nameInput.clear().type(value);
    return this;
  }

  fillIntroduced(introduced) {
    const introducedInput = cy.get(`[id="introduced"]`);
    introducedInput.clear().type(introduced);
    return this;
  }

  fillDiscontinued(discontinued) {
    const discontinuedInput = cy.get(`[id="discontinued"]`);
    discontinuedInput.clear().type(discontinued);
    return this;
  }
  selectCompany(name) {
    const selectOption = cy.get(`[id="company"]`);
    selectOption.select(name);
    return this;
  }
  clickOnCreateThisComputerButton() {
    const createBtn = cy.get(`[value="Create this computer"]`);
    createBtn.click();
  }

  clickOnDeleteThisComputerBtn() {
    const deleteBtn = cy.get(`[value="Delete this computer"]`);
    deleteBtn.click({ force: true });
  }

  clickOnSaveThisComputer() {
    cy.get(`[value="Save this computer"]`).click({ force: true });
  }

  nameError(error) {
    return cy
      .get(`[id="name"]`)
      .next('.help-inline')
      .contains(`Required`);
  }
  introducedError(error) {
    return cy
      .get(`[id="introduced"]`)
      .next('.help-inline')
      .contains(`Date ('yyyy-MM-dd')`);
  }
  discontinuedError(error) {
    return cy
      .get(`[id="discontinued"]`)
      .next('.help-inline')
      .contains(`Date ('yyyy-MM-dd')`);
  }

  createNewComputer(name, introduced, discontinued, company) {
    this.fillName(name)
      .fillIntroduced(introduced)
      .fillDiscontinued(discontinued)
      .selectCompany(company)
      .clickOnCreateThisComputerButton();
  }
}
module.exports = NewComputerPage;
