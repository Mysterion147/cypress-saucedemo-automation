import { loginPage } from "../support/page_objects/LoginPage";
import { inventoryPage } from "../support/page_objects/InventoryPage";
import { checkoutPage } from "../support/page_objects/CheckoutPage";

describe("Checkout Flow (POM Version)", () => {
  beforeEach(function () {
    cy.fixture("users").as("userData");
    cy.fixture("customers").as("customerData");
    cy.visit("/");

    cy.get("@userData").then((data) => {
      loginPage.submitLogin(data.standard.user, data.standard.pass);
    });
  });

  it("Should complete a purchase with dynamic name, price and tax validation", function () {
    // saving both name and price of the first item
    inventoryPage.elements.inventoryItems().first().within(() => {
      inventoryPage.elements.itemNames().invoke('text').as('selectedItemName');
      inventoryPage.elements.itemPrices().invoke('text').then((text) => {
        cy.wrap(parseFloat(text.replace("$", ""))).as("selectedItemPrice");
      });
      cy.get("button").click();
    });

    checkoutPage.goToCheckout();

    cy.get("@customerData").then((data) => {
      checkoutPage.fillInfo(data.standard.firstName, data.standard.lastName, data.standard.zipCode);
    });

    cy.get("@selectedItemName").then((name) => {
      inventoryPage.elements.itemNames().should("have.text", name);
    });

    cy.get("@selectedItemPrice").then((originalPrice) => {
      checkoutPage.elements.summarySubtotal().should("contain", originalPrice);

      checkoutPage.elements.summaryTax().then(($taxEl) => {
        const taxValue = parseFloat($taxEl.text().replace("Tax: $", ""));
        const expectedTotal = (originalPrice + taxValue).toFixed(2);
        checkoutPage.elements.summaryTotal().should("contain", expectedTotal);
      });
    });

    // final assertion -> check if we got to the ending page
    checkoutPage.elements.finishBtn().click();
    checkoutPage.elements.completeHeader().should("have.text", "Thank you for your order!");
  });
  
  // Data-Driven Testing Approach
  const errorScenarios = [
    { field: "no Last Name", fname: "John", lname: "{backspace}", zip: "123", error: "Last Name is required" },
    { field: "no First Name", fname: "{backspace}", lname: "Doe", zip: "123", error: "First Name is required" },
    { field: "no Zip Code", fname: "John", lname: "Doe", zip: "{backspace}", error: "Postal Code is required" }
  ];

  errorScenarios.forEach((scenario) => {
    it(`Should show error when ${scenario.field}`, function () {
      inventoryPage.addItemToCart(0);
      checkoutPage.goToCheckout();
      checkoutPage.fillInfo(scenario.fname, scenario.lname, scenario.zip);
      
      checkoutPage.elements.errorMessage()
        .should("be.visible")
        .and("contain.text", scenario.error);
    });
  });

  it("Should be able to cancel at any point and return to Home Page", function () {
    // populating cart and checking out
    inventoryPage.addItemToCart(0);
    checkoutPage.goToCheckout();
    
    // going back
    checkoutPage.elements.cancelBtn().click();
    cy.get('[data-test="continue-shopping"]').click();

    // assertion -> checking the url
    cy.url().should("include", "/inventory.html");
  });
});