const { test, expect } = require('@playwright/test');
test("logintestcase", async ({ page }) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await expect(page.locator("#email")).toBeVisible();
    await page.locator("#email").fill(process.env.TEST_EMAIL)
    await page.locator("#password").fill(process.env.TEST_PASSWORD)
    await page.locator("#login-btn").click();
    await expect(page.locator('article[data-testid="event-card"]').first()).toBeVisible();

    await page.context().storageState({
        
        path: 'playwright/.auth/user.json'
    });
})