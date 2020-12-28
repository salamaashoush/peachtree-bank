describe('peach-tree', () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit('/');
  });

  it('should display list of transactions and transfer form', () => {
    cy.contains('Transfer');
    cy.contains('Recent Transactions');
  });
});
