class CheckoutPage {
  elements = {
    cartLink: () => cy.get('[data-test="shopping-cart-link"]'),
    checkoutBtn: () => cy.get('[data-test="checkout"]'),
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueBtn: () => cy.get('[data-test="continue"]'),
    finishBtn: () => cy.get('[data-test="finish"]'),
    cancelBtn: () => cy.get('[data-test="cancel"]'),
    backToProductsBtn: () => cy.get('[data-test="back-to-products"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    summarySubtotal: () => cy.get(".summary_subtotal_label"),
    summaryTax: () => cy.get(".summary_tax_label"),
    summaryTotal: () => cy.get(".summary_total_label"),
    completeHeader: () => cy.get(".complete-header")
  };

  goToCheckout() {
    this.elements.cartLink().click();
    this.elements.checkoutBtn().click();
  }

  fillInfo(fname, lname, zip) {
    if (fname) this.elements.firstNameInput().type(fname);
    if (lname) this.elements.lastNameInput().type(lname);
    if (zip) this.elements.postalCodeInput().type(zip);
    this.elements.continueBtn().click();
  }
}

export const checkoutPage = new CheckoutPage();