Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  
  // Using data-test selectors for stability
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});