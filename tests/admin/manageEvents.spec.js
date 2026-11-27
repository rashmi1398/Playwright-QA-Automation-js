const { test,expect } = require('../../fixtures/testfixtures')

test("logintestcase", async ({ authenticatedpage }) => {
    await authenticatedpage.goto("https://eventhub.rahulshettyacademy.com/")
    await authenticatedpage.getByRole("button", { name: "Admin" }).click();
    const manageBookings = authenticatedpage.getByRole('navigation').getByRole('link', { name: 'Manage Events' })
    await manageBookings.click();
    await expect(authenticatedpage.locator("#event-title-input")).toBeVisible();
    await authenticatedpage.locator("#event-title-input").fill("Arjit singh concert")
    await authenticatedpage.locator("#category").selectOption("Concert")
    await authenticatedpage.locator("#city").fill("belgaum")
    await authenticatedpage.locator("#venue").fill("KLE college ground")
    await authenticatedpage.locator('input[id="event-date-&-time"]').fill("2026-12-20T10:30");
    await authenticatedpage.locator('input[id="price-($)"]').fill("50")
    await authenticatedpage.locator("#total-seats").fill("1000")
    await authenticatedpage.locator('div button[type="submit"]').click();
    await expect(authenticatedpage.getByText('Event created!', { exact: true })).toBeVisible();
})