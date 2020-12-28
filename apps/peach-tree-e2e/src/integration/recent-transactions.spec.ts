import { getTestIdSelector } from '@backbase/ui';
describe('Recent transactions', () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit('/');
  });

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

  it('should sort by date correctly', () => {
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .should('have.data', 'date', 1600493600000);
    cy.get(getTestIdSelector('sortBar.item', 'date')).click();
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .should('have.data', 'date', 1476721442000);
  });

  it('should sort by amount correctly', () => {
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .get(getTestIdSelector('transactionItem.amount'))
      .should('contain', '+€5,000.00');
    cy.get(getTestIdSelector('sortBar.item', 'amount')).click().click();
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .get(getTestIdSelector('transactionItem.amount'))
      .should('contain', '-€19.72');
  });

  it('should sort by beneficiary correctly', () => {
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .get(getTestIdSelector('transactionItem.beneficiary'))
      .should('contain', 'Backbase');
    cy.get(getTestIdSelector('sortBar.item', 'beneficiary')).click();
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .get(getTestIdSelector('transactionItem.beneficiary'))
      .should('contain', 'Whole Foods');
  });
});
