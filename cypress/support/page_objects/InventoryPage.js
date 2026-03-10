class InventoryPage {
  elements = {
    sortDropdown: () => cy.get('[data-test="product-sort-container"]'),
    itemPrices: () => cy.get(".inventory_item_price"),
    itemNames: () => cy.get(".inventory_item_name"),
    inventoryItems: () => cy.get(".inventory_item"),
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    detailsName: () => cy.get(".inventory_details_name"),
    itemLinkById: (id) => cy.get(`[data-test="item-${id}-title-link"]`)
  };

  selectSort(option) {
    this.elements.sortDropdown().select(option);
  }

  addItemToCart(index = 0) {
    this.elements.inventoryItems().eq(index).find("button").click();
  }

  clickItemName(index = 0) {
    this.elements.itemNames().eq(index).click();
  }

  clickItemById(id) {
    this.elements.itemLinkById(id).click();
  }
}

export const inventoryPage = new InventoryPage();
