import { loginPage } from "../support/page_objects/LoginPage";

describe("Login Flow (POM Version)", () => {
  beforeEach(function () {
    cy.fixture("users").as("userData");
    cy.visit("/");
  });

  it("Should login successfully with standard_user", function () {
    loginPage.submitLogin(this.userData.standard.user, this.userData.standard.pass);
    
    cy.url().should("include", "/inventory.html");
    cy.get(".title").should("have.text", "Products");
  });

  it("Should not complete login with wrong password", function () {
    loginPage.submitLogin(this.userData.standard.user, "wrongpassword147");

    loginPage.elements.errorMessage().should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Should not complete login with locked out user", function () {
    loginPage.submitLogin(this.userData.locked.user, this.userData.locked.pass);
    
    loginPage.elements.errorMessage().should("have.text", "Epic sadface: Sorry, this user has been locked out.");
    cy.url().should("equal", Cypress.config('baseUrl') + '/');
  });

  it("Should show error when fields are empty", () => {
    loginPage.elements.loginButton().click();
    loginPage.elements.errorMessage().should("have.text", "Epic sadface: Username is required");
  });

  it("Should show error when password is empty", function () {
    loginPage.submitLogin(this.userData.standard.user, '{backspace}');
    
    loginPage.elements.loginButton().click();
    loginPage.elements.errorMessage().should("have.text", "Epic sadface: Password is required");
  });

  it('Should logout when clicking "Logout"', function () {
    loginPage.submitLogin(this.userData.standard.user, this.userData.standard.pass);
    loginPage.logout();

    cy.url().should("equal", Cypress.config('baseUrl') + '/');
  });
});