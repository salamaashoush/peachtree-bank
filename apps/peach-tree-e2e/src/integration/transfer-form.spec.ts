import { getTestIdSelector } from '@backbase/ui';

describe('Transfer form', () => {
  beforeEach(() => {
    cy.mockApi();
    cy.visit('/');
  });
  it('should display disabled submit button', () => {
    cy.get(getTestIdSelector('transferForm.submit')).should(
      'have.attr',
      'disabled'
    );
  });
  it('should display disabled fromAccount input', () => {
    cy.get(getTestIdSelector('transferForm.fromAccount')).should(
      'have.attr',
      'disabled'
    );
  });

  it('should display enabled submit button after filling the form', () => {
    cy.get(getTestIdSelector('transferForm.toAccount'))
      .type('Backbase')
      .should('have.value', 'Backbase');
    cy.get(getTestIdSelector('transferForm.amount'))
      .clear()
      .type('500')
      .should('have.value', '500');
    cy.get(getTestIdSelector('transferForm.submit')).should(
      'not.have.attr',
      'disabled'
    );
  });

  it('should display error if you entered out of balance amount', () => {
    cy.get(getTestIdSelector('transferForm.toAccount')).type('Backbase');
    cy.get(getTestIdSelector('transferForm.amount')).clear().type('50000');
    cy.get(getTestIdSelector('transferForm.submit')).should(
      'have.attr',
      'disabled'
    );
    cy.get(getTestIdSelector('transferForm.error'))
      .should('exist')
      .contains(`You don't have`);
  });

  it('should preview transaction after clicking submit', () => {
    cy.get(getTestIdSelector('transferForm.toAccount')).type('Backbase');
    cy.get(getTestIdSelector('transferForm.amount')).clear().type('500');
    cy.get(getTestIdSelector('transferForm.submit')).click();
    cy.get(getTestIdSelector('transferForm.transfer')).should('exist');
    cy.get(getTestIdSelector('transferForm.toAccount')).should(
      'have.attr',
      'disabled'
    );
    cy.get(getTestIdSelector('transferForm.amount')).should(
      'have.attr',
      'disabled'
    );
  });

  it('should add transaction and deduct from account after clicking transfer', () => {
    cy.get(getTestIdSelector('transferForm.fromAccount')).should(
      'have.value',
      'Free Checking(4692) - €5,824.76'
    );
    cy.get(getTestIdSelector('transferForm.toAccount')).type('Salama Ashoush');
    cy.get(getTestIdSelector('transferForm.amount')).clear().type('5000');
    cy.get(getTestIdSelector('transferForm.submit')).click();
    cy.get(getTestIdSelector('transferForm.transfer')).click();
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .get(getTestIdSelector('transactionItem.beneficiary'))
      .should('contain', 'Salama Ashoush');
    cy.get(getTestIdSelector('app.recentTransactions'))
      .children()
      .first()
      .get(getTestIdSelector('transactionItem.amount'))
      .should('contain', '-€5,000.00');
    cy.get(getTestIdSelector('transferForm.fromAccount')).should(
      'have.value',
      'Free Checking(4692) - €824.76'
    );
  });
});
