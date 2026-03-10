describe("Checkout Flow", () => {
  beforeEach(function () {
    cy.fixture("users").as("userData");
    cy.fixture("customers").as("customerData");
    cy.visit("/");

    cy.get("@userData").then((data) => {
      cy.login(data.standard.user, data.standard.pass);
    });
  });

  it("Should complete a purchase with dynamic name, price and tax validation", function () {
    // saving both name and price of the first item
    cy.get(".inventory_item")
      .first()
      .within(() => {
        cy.get(".inventory_item_name").then(($name) => {
          cy.wrap($name.text()).as("selectedItemName");
        });

        cy.get(".inventory_item_price").then(($price) => {
          const priceValue = parseFloat($price.text().replace("$", ""));
          cy.wrap(priceValue).as("selectedItemPrice");
        });

        cy.get("button").click();
      });

    // going to checkout info
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    // filling form with function
    cy.get("@customerData").then((data) => {
      cy.forms(data.standard.firstName, data.standard.lastName, data.standard.zipCode);
    });

    // assertion -> ensuring data integrity after changing pages
    cy.get("@selectedItemName").then((name) => {
      cy.get(".inventory_item_name").should("have.text", name);
    });

    cy.get("@selectedItemPrice").then((originalPrice) => {
      // assertion -> checking order total
      cy.get(".summary_subtotal_label").should("contain", originalPrice);

      // calcullating tax (seems to be 8%) and total
      cy.get(".summary_tax_label").then(($taxEl) => {
        const taxValue = parseFloat($taxEl.text().replace("Tax: $", ""));
        const expectedTotal = (originalPrice + taxValue).toFixed(2);

        // assertion -> checking if the UI value matches the expected
        cy.get(".summary_total_label").should("contain", expectedTotal);
      });
    });

    // final assertion -> check if we got to the ending page
    cy.get('[data-test="finish"]').click();
    cy.get(".complete-header").should("have.text", "Thank you for your order!");
  });

  it("Should show an error message when the checkout form is incomplete (no Last Name)", function () {
    // populating cart and checking out
    cy.get(".inventory_item").first().find("button").click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    // filling form with function (no Last Name)
    cy.get("@customerData").then((data) => {
      cy.forms(data.standard.firstName, "{backspace}", data.standard.zipCode);
    });

    // assertions -> checking if the error is visible and has the correct text
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Error: Last Name is required");
  });

  it("Should show an error message when the checkout form is incomplete (no First Name)", function () {
    // populating cart and checking out
    cy.get(".inventory_item").first().find("button").click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    // filling form with function (no First Name)
    cy.get("@customerData").then((data) => {
      cy.forms("{backspace}", data.standard.lastName, data.standard.zipCode);
    });

    // assertions -> checking if the error is visible and has the correct text
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Error: First Name is required");
  });

  it("Should show an error message when the checkout form is incomplete (no Zip/Postal Code)", function () {
    // populating cart and checking out
    cy.get(".inventory_item").first().find("button").click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

    // filling form with function (no Zip/Postal Code)
    cy.get("@customerData").then((data) => {
      cy.forms(data.standard.firstName, data.standard.lastName, "{backspace}");
    });

    // assertions -> checking if the error is visible and has the correct text
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain.text", "Error: Postal Code is required");
  });

  it("Should be able to cancel at any point and return to Home Page", function () {
    // populating cart and checking out
    cy.get(".inventory_item").first().find("button").click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();

     // going back
     cy.get('[data-test="cancel"]').click();
     cy.get('[data-test="continue-shopping"]').click();

     // assertion -> checking the url
     cy.url().should("include", "/inventory.html");
  });
});
