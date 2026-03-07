describe('SauceDemo Login Flow', () => {
  it('should login successfully with standard_user', () => {
    // deprecated since the creation of the login global function 
    /*
    // visiting the baseurl from config
    cy.visit('/');

    // interacting w elements
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    */

    // utilizing the login function
    cy.login('standard_user', 'secret_sauce');

    // assertions -> checking url and title text
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });
});