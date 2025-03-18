const { Given, When, Then, Before, After } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { chromium } = require('playwright');

Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

After(async function () {
  await this.browser.close();
});

    Given('I am on the homepage of the e-commerce website', async function () {
      await this.page.goto('https://magento.softwaretestingboard.com/');
    });

    When('I search for the product {string}', async function (product) {
      const searchBox = this.page.locator('input[name="q"]');
      await searchBox.fill(product);
      await searchBox.press('Enter');
    });

  When('I click on the first product in the search results', async function () {
    await this.page.waitForSelector('.product-item-link');
    const firstProduct = this.page.locator('.product-item-link').first();
    await firstProduct.click();
  });


  When('I select size {string} and color {string}', async function (size, colour) {
    await this.page.waitForSelector('(//div[.="'+size+'"])[1]'); 
    await this.page.locator('(//div[.="'+size+'"])[1]').click();
    await this.page.waitForSelector('//*[@option-label="'+colour+'"]');
    await this.page.locator('//*[@option-label="'+colour+'"]').click();
   });


  When('I click the {string} button', async function (buttonText) {
    const addToCartButton = this.page.locator('(//span[.="'+buttonText+'"])[1]');
    await addToCartButton.click();
  });
  

  Then('I should see a notification that the product has been added to the cart', async function () {
    await this.page.waitForSelector('.message-success'); 
    const notification = this.page.locator('.message-success');
    await expect(notification).toContainText('You added');
  });


  When('I open the shopping cart', async function () {
    const cartLink = this.page.locator('.showcart');
    await cartLink.click();
    await this.page.waitForSelector('#mini-cart');
    const viewCartButton = this.page.locator('a.action.viewcart');
    await viewCartButton.click();
  });



  Then('I should see the selected size {string} and color {string} in the cart', async function (size, colour) {
    await this.page.waitForSelector('.cart.item');
    const sizeInCart = this.page.locator('//span[.="'+size+'"]'); 
    const colorInCart = this.page.locator('//span[.="'+colour+'"]');
    const expectedColour = 'Gray';
    const expectedSize = 'M';
    const selectedSize = await sizeInCart.textContent();
    const selectedColour = await colorInCart.textContent();
    console.log(`Expected Size: ${expectedSize}`);
    console.log(`Actual Size: ${selectedSize}`);
    console.log(`Expected Color: ${expectedColour}`);
    console.log(`Actual Color: ${selectedColour}`);
    expect(expectedSize).toEqual(selectedSize);
    expect(expectedColour).toEqual(selectedColour);
  
  });

  Then('I should see the initial subtotal for the product', async function () {
    await this.page.waitForSelector('.sub');
    const subtotalBeforeUpdate = this.page.locator('.sub');
    const subtotalTextBeforeUpdate = await subtotalBeforeUpdate.textContent();
    const subtotalValueBeforeUpdate = parseFloat(subtotalTextBeforeUpdate.replace(/[^0-9.]/g, ''));
    console.log(`Initial Subtotal Before Update: ${subtotalValueBeforeUpdate}`);
  });


  When('I update the quantity to {string}', async function (qty) {
    const quantityInput = this.page.locator('input.qty');
    await quantityInput.fill(qty);
    await this.page.locator('//span[.="Update Shopping Cart"]').click();
    await this.page.waitForTimeout(2000);
  });

  Then('I should see the updated subtotal reflecting the new quantity', async function () {
    await this.page.waitForSelector('.sub');
    const subtotal = this.page.locator('.sub');
    const subtotalText = await subtotal.textContent();
    const subtotalValue = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
    console.log(`Updated Subtotal: ${subtotalValue}`);
    expect(subtotalValue).toBeGreaterThan(0); 
   });