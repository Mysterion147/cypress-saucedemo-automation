describe('Login Flow', () => {
  
  // will be used in every single scenario
  beforeEach(() => {
    cy.fixture('users').as('userData');
    cy.visit('/');
  });

  it('Should login successfully with standard_user', function() {
    // deprecated since the creation of the login global function 
    /*
    // visiting the baseurl from config
    cy.visit('/');

    // interacting w elements
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    */

    // utilizing the login function + fixture
    cy.login(this.userData.standard.user, this.userData.standard.pass);

    // assertions -> checking url and title text
    cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products');
  });

  it('Should not complete login with wrong password', function() {
    cy.login(this.userData.standard.user, 'wrongpassword147');

    // assertions -> checking url and error message
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    cy.url().should('equal', 'https://www.saucedemo.com/');
  });

  it('Should not complete login with locked out user', function() {
    cy.login(this.userData.locked.user, this.userData.locked.pass);

    // assertions -> checking url and error message
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    cy.url().should('equal', 'https://www.saucedemo.com/');
  });

  it('Should show error when fields are empty', () => {
    cy.get('[data-test="login-button"]').click();

    // assertions -> checking url and error message
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Username is required')
    cy.url().should('equal', 'https://www.saucedemo.com/');
  });

  it('Should show error when password is empty', () => {
    cy.get('[data-test="username"]').type('standard_user');

    cy.get('[data-test="login-button"]').click();

    // assertions -> checking url and error message
    cy.get('[data-test="error"]').should('have.text', 'Epic sadface: Password is required')
    cy.url().should('equal', 'https://www.saucedemo.com/');
  });

  it('Should logout when clicking "Logout"', function() {
    cy.login(this.userData.standard.user, this.userData.standard.pass);

    // logging out
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();

    // assertion -> should be at Home Page
    cy.url().should('equal', 'https://www.saucedemo.com/');
  });
});