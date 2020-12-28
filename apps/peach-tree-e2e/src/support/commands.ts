// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    mockApi(): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('mockApi', () => {
  cy.intercept('GET', '/assets/transactions.json', {
    fixture: 'transactions.json',
  }).as('transactions');
  cy.intercept('GET', '/assets/account.json', { fixture: 'account.json' }).as(
    'account'
  );
  cy.waitFor(['@transactions', '@account']);
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
