const { test: base, expect } = require('@playwright/test');
const test = base.extend({
    authenticatedpage: async ({ browser }, use) => {
        const context = await browser.newContext({
            storageState: 'playwright/.auth/user.json'

        })
        const page = await context.newPage();
        await use(page);
        await context.close();
    },
})

module.exports = { test, expect };