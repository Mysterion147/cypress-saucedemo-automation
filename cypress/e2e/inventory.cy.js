describe("Inventory Flow", () => {
  // logging in successfully before every test case
  beforeEach(function () {
    cy.fixture("users").as("userData");
    cy.visit("/");
    cy.get("@userData").then((data) => {
      cy.login(data.standard.user, data.standard.pass);
    });
  });

  it("Should sort products by Price (low to high)", () => {
    // selecting the related filter (low to high in this case)
    // got the children value by inspecting element
    cy.get('[data-test="product-sort-container"]').select("lohi");

    let prices = [];
    cy.get(".inventory_item_price")
      .each(($el) => {
        // converting to number
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      .then(() => {
        // list copy so I can compare the real vs expected.
        // '[...prices]' is a shallow copy of the array, allowing me to keep the original unchanged
        // so I can compare it later w the sorted vers.
        const sortedPrices = [...prices].sort((a, b) => a - b); // if '(a-b)' is negative -> 'a' comes first
        expect(prices).to.deep.equal(sortedPrices);
      });
  });

  it("Should sort products by Price (high to low)", () => {
    cy.get('[data-test="product-sort-container"]').select("hilo");

    let prices = [];
    cy.get(".inventory_item_price")
      .each(($el) => {
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      .then(() => {
        const sortedPrices = [...prices].sort((a, b) => b - a); // if '(b-a)' is positive -> 'b' comes first
        expect(prices).to.deep.equal(sortedPrices);
      });
  });

  it("Should sort products by Name (A to Z)", () => {
    cy.get('[data-test="product-sort-container"]').select("az");

    let names = [];
    cy.get(".inventory_item_name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
  });

  it("Should sort products by Name (Z to A)", () => {
    cy.get('[data-test="product-sort-container"]').select("za");

    let names = [];
    cy.get(".inventory_item_name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sortedNames = [...names].sort().reverse(); // simply sorting in alphabetical order and reversing it
        expect(names).to.deep.equal(sortedNames);
      });
  });

  it("Should show products details (checking url)", () => {
    cy.get(
      '[data-test="item-0-title-link"] > [data-test="inventory-item-name"]',
    ).click();

    // assertions -> checking product name and url
    cy.url().should("include", "/inventory-item.html?id=0");
  });

  // same as above, but capturing the name b4 clicking it and checking the specific name afterwards
  it("Should show products details (checking name)", () => {
    // capturing the name
    cy.get(".inventory_item_name")
      .first()
      .then(($name) => {
        const productName = $name.text();

        cy.wrap($name).click();

        // checking that specific name
        cy.get(".inventory_details_name").should("have.text", productName);
      });
  });

  it("Should update UI and Cart Badge when adding an item", () => {
    // ensuring a clean state
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");

    // clicking the first add to cart button
    cy.get(".inventory_item").first().find("button").click();

    // assertions -> checking if the button changed and if the badge is now visible/with number 1
    cy.get(".inventory_item")
      .first()
      .find("button")
      .should("have.text", "Remove");
    cy.get('[data-test="shopping-cart-badge"]')
      .should("be.visible")
      .and("have.text", "1");
  });

  it('Should remove from Cart and update badge when clicking "Remove"', () => {
    // ensuring a clean state
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");

    // clicking the first add to cart button and checking it it worked
    cy.get(".inventory_item").first().find("button").click();
    cy.get('[data-test="shopping-cart-badge"]').should("have.text", "1");

    // clicking the remove button
    cy.get(".inventory_item").first().find("button").click(); // the state changes but the button is the same

    // assertions -> checking if the button reverted and the badge no longer exists
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
      .should("be.visible")
      .and("have.text", "Add to cart");

    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
  });
});
