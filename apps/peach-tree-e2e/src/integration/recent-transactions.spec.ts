import { getTestIdSelector } from '@backbase/ui';
describe('peach-tree -> recent transactions', () => {
  beforeEach(() => cy.visit('/'));

  it('should display list of default transactions', () => {
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .should('have.length.greaterThan', 10);
  });
  it('should filter transaction when user input into search box', () => {
    cy.get(getTestIdSelector('searchBox.input')).type('H&M');
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .should('have.length', 1);

    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .contains('H&M');
  });

  it('should reset transaction list when search cleared', () => {
    cy.get(getTestIdSelector('searchBox.input')).type('H&M');
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .should('have.length', 1);
    cy.get(getTestIdSelector('searchBox.clear')).click();
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .should('have.length.greaterThan', 10);
  });
});
