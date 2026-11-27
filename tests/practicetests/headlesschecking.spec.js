
const { test, expect } = require('@playwright/test');

test('Headless application loading check', async ({ page }) => {

    page.on('requestfailed', request => {
        console.log('FAILED REQUEST:', request.url());
        console.log('REASON:', request.failure()?.errorText);
    });

    page.on('response', response => {
        if (response.status() >= 400) {
            console.log('HTTP ERROR:', response.status(), response.url());
        }
    });

    page.on('pageerror', error => {
        console.log('JAVASCRIPT ERROR:', error.message);
    });

    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    console.log('URL:', page.url());

    await expect(page.locator('#email')).toBeVisible({
        timeout: 15000
    });

    console.log('LOGIN PAGE LOADED');
});
