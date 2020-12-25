import { getGreeting } from '../support/app.po';

xdescribe('peach-tree', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    // Custom command example, see `../support/commands.ts` file

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to peach-tree!');
  });
});
