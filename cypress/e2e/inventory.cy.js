import { loginPage } from "../support/page_objects/LoginPage";
import { inventoryPage } from "../support/page_objects/InventoryPage";

describe("Inventory Flow (POM Version)", () => {
  beforeEach(function () {
    cy.fixture("users").as("userData");
    cy.visit("/");
    cy.get("@userData").then((data) => {
      // using LoginPage for setup
      loginPage.submitLogin(data.standard.user, data.standard.pass);
    });
  });

  it("Should sort products by Price (low to high)", () => {
    // selecting the related filter (low to high in this case)
    // got the children value by inspecting element
    inventoryPage.selectSort("lohi");

    let prices = [];
    inventoryPage.elements.itemPrices()
      .each(($el) => {
        // converting to number
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      // list copy so I can compare the real vs expected.
      // '[...prices]' is a shallow copy of the array, allowing me to keep the original unchanged
      // so I can compare it later w the sorted vers.
      .then(() => {
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
      });
  });

  it("Should sort products by Price (high to low)", () => {
    inventoryPage.selectSort("hilo");

    let prices = [];
    inventoryPage.elements.itemPrices()
      .each(($el) => {
        prices.push(parseFloat($el.text().replace("$", "")));
      })
      .then(() => {
        const sortedPrices = [...prices].sort((a, b) => b - a); // if '(b-a)' is positive -> 'b' comes first
        expect(prices).to.deep.equal(sortedPrices);
      });
  });

  it("Should sort products by Name (A to Z)", () => {
    inventoryPage.selectSort("az");

    let names = [];
    inventoryPage.elements.itemNames()
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sortedNames = [...names].sort();
        expect(names).to.deep.equal(sortedNames);
      });
  });

  it("Should sort products by Name (Z to A)", () => {
    inventoryPage.selectSort("za");

    let names = [];
    inventoryPage.elements.itemNames()
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        const sortedNames = [...names].sort().reverse(); // simply sorting in alphabetical order and reversing it
        expect(names).to.deep.equal(sortedNames);
      });
  });

  it("Should show products details (checking url)", () => {
    inventoryPage.clickItemById(0);

    // assertions -> checking product name and url
    cy.url().should("include", "/inventory-item.html?id=0");
  });
  
  // same as above, but capturing the name b4 clicking it and checking the specific name afterwards
  it("Should show products details (checking name)", () => {
    inventoryPage.elements.itemNames().first().then(($name) => {
      const productName = $name.text();
      cy.wrap($name).click();
      
      inventoryPage.elements.detailsName().should("have.text", productName);
    });
  });

  it("Should update UI and Cart Badge when adding an item", () => {
    // ensuring a clean state
    inventoryPage.elements.cartBadge().should("not.exist");

    inventoryPage.addItemToCart(0);

    // assertions -> checking if the button changed and if the badge is now visible/with number 1
    inventoryPage.elements.inventoryItems().first().find("button").should("have.text", "Remove");
    inventoryPage.elements.cartBadge().should("be.visible").and("have.text", "1");
  });

  it('Should remove from Cart and update badge when clicking "Remove"', () => {
    inventoryPage.addItemToCart(0);
    inventoryPage.elements.cartBadge().should("have.text", "1");

    inventoryPage.addItemToCart(0);

    // assertion -> checking if the badge no longer exists
    inventoryPage.elements.cartBadge().should("not.exist");
  });
});