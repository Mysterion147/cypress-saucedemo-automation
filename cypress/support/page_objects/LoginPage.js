class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    menuButton: () => cy.get("#react-burger-menu-btn"),
    logoutLink: () => cy.get('[data-test="logout-sidebar-link"]')
  };

  submitLogin(username, password) {
    if (username) this.elements.usernameInput().type(username);
    if (password) this.elements.passwordInput().type(password);
    this.elements.loginButton().click();
  }

  logout() {
    this.elements.menuButton().click();
    this.elements.logoutLink().click();
  }
}

export const loginPage = new LoginPage();