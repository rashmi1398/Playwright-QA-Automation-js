const { test, expect } = require('@playwright/test');

test.use({
    storageState: 'playwright/.auth/user.json'
});

test('User can view available events', async ({ page }) => {

    await page.goto('https://eventhub.rahulshettyacademy.com/events');

    // Verify user is logged in
    await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();

    // Verify event cards are displayed
    await expect(
        page.locator('article[data-testid="event-card"]').first()
    ).toBeVisible();

});