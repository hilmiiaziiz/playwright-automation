const { When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { TIMEOUT } = require('dns');

When('I sort the results by price high to low',{ timeout: 30000 }, async function () {
  await this.page.selectOption('#sorter', 'price');
  await this.page.waitForTimeout(3000);
  await this.page.reload({ waitUntil: 'load' }); 
  await this.page.selectOption('#sorter', 'price');
  await this.page.waitForTimeout(3000); 
  await this.page.reload({ waitUntil: 'load' }); 
  await this.page.waitForSelector('[data-price-type="finalPrice"]');
});

Then('I should see the products sorted by price high to low', async function () {
  await this.page.waitForSelector('[data-price-type="finalPrice"]');

  const firstPriceElement1 = this.page.locator('[data-price-type="finalPrice"]').nth(0);
  const secondPriceElement1 = this.page.locator('[data-price-type="finalPrice"]').nth(1);

  const firstPriceText1 = await firstPriceElement1.textContent();
  const secondPriceText1 = await secondPriceElement1.textContent();

  const firstPrice1 = parseFloat(firstPriceText1.replace(/[^0-9.]/g, ''));
  const secondPrice1 = parseFloat(secondPriceText1.replace(/[^0-9.]/g, ''));

  console.log(`First Price high: ${firstPrice1}`);
  console.log(`Second Price high: ${secondPrice1}`);

  if (firstPrice1 >= secondPrice1) {
    console.log('\n', 'Sorting is correct: First price is higher than the second price.');
  } else {
    console.log('Sorting is incorrect: First price is not higher than the second price.');
  }

  expect(firstPrice1).toBeGreaterThanOrEqual(secondPrice1);
});

When('I sort the results by price low to high', async function () {
    await this.page.waitForSelector('[data-price-type="finalPrice"]');
    await this.page.waitForTimeout(3000);
    const firstPriceElement1 = this.page.locator('[data-price-type="finalPrice"]').nth(0);
    const secondPriceElement1 = this.page.locator('[data-price-type="finalPrice"]').nth(1);
  
    const firstPriceText1 = await firstPriceElement1.textContent();
    const secondPriceText1 = await secondPriceElement1.textContent();
  
    const firstPrice1 = parseFloat(firstPriceText1.replace(/[^0-9.]/g, ''));
    const secondPrice1 = parseFloat(secondPriceText1.replace(/[^0-9.]/g, ''));
  
    console.log(`First Price high: ${firstPrice1}`);
    console.log(`Second Price high': ${secondPrice1}`);
  
    if (firstPrice1 >= secondPrice1) {
      console.log('\n','Sorting is correct: First price is higher than the second price.');
    } else {
      console.log('Sorting is incorrect: First price is not higher than the second price.');
    }
    expect(firstPrice1).toBeGreaterThanOrEqual(secondPrice1);

});

////

Then('I should see the products sorted by price low to high', async function () {
    const actionElement = this.page.locator('.results > div:nth-of-type(1) > .toolbar-sorter > .action');
    await actionElement.click();
    await this.page.waitForTimeout(3000);

    await this.page.waitForSelector('[data-price-type="finalPrice"]');

    const firstPriceElement = this.page.locator('[data-price-type="finalPrice"]').nth(0);
    const secondPriceElement = this.page.locator('[data-price-type="finalPrice"]').nth(1);
  
    const firstPriceText = await firstPriceElement.textContent();
    const secondPriceText = await secondPriceElement.textContent();
  
    const firstPrice = parseFloat(firstPriceText.replace(/[^0-9.]/g, ''));
    const secondPrice = parseFloat(secondPriceText.replace(/[^0-9.]/g, ''));
  
    console.log(`First Price low: ${firstPrice}`);
    console.log(`Second Price low, ${secondPrice}`);
  
    if (firstPrice <= secondPrice) {
      console.log('Sorting is correct: First price is lower than the second price.');
    } else {
      console.log('Sorting is incorrect: First price is not lower than the second price.');
    }
  
    expect(firstPrice).toBeLessThanOrEqual(secondPrice);
});