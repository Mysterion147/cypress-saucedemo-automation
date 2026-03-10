Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");

  // Using data-test selectors for stability
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add("forms", (firstName, lastName, zipCode) => {
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(zipCode);
  cy.get('[data-test="continue"]').click();
});