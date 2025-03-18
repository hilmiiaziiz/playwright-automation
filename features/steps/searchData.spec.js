const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');


  // Step 4: Get all search result items
  When('I wait for the search results to load', async function () {
    const searchResults = this.page.locator('.product-item-link');
  });

  // Then('I should print all elements containing the word {string}', async function (product){
  //  await page.waitForSelector('.product-item-link');
  //  const searchResults = page.locator('.product-item-link');

  // // Step 5: Iterate through the results and print elements containing "jacket"
  // const count = await searchResults.count();
  // for (let i = 0; i < count; i++) {
  //   const itemText = await searchResults.nth(i).textContent();
  //   if (itemText.toLowerCase().includes(product)) {
  //     console.log(`Element ${i + 1}: ${itemText}`);
  //   }
  // }

  Then('I should print all elements containing the word {string}', async function (keyword) {
    const searchResults = this.page.locator('.product-item-link');
    const count = await searchResults.count();
  
    for (let i = 0; i < count; i++) {
      const itemText = await searchResults.nth(i).textContent();
      if (itemText.toLowerCase().includes(keyword.toLowerCase())) {
        console.log(`Element ${i + 1}: ${itemText}`);
      }
    }
});