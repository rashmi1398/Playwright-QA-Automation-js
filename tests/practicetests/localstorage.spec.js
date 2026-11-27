const { test, expect } = require('@playwright/test');

test('localstoragechecking', async ({ page }) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await expect(page.locator("#email")).toBeVisible();
    await page.locator("#email").fill("khotrashmi@gmail.com")
    await page.locator("#password").fill("Rashu@13091998")
    await page.locator("#login-btn").click();
    await expect(page.locator('article[data-testid="event-card"]').first()).toBeVisible();
    const storagedata = await page.evaluate(()=>{
      return Object.entries(localStorage);
    })
    const gettoken=await page.evaluate(()=>{
        return localStorage.getItem("eventhub_token");

    })
    expect(gettoken).not.toBeNull();
    await page.reload()
    /*const confirmtoken = await page.evaluate(()=>{
        return localStorage.getItem("eventhub_token")
    })
    console.log(confirmtoken);*/
    const tokendeletion= await page.evaluate(()=>{
        return localStorage.removeItem("eventhub_token")
    })

    // Check whether token exists
    const tokendelete = await page.evaluate(() => {
        return localStorage.getItem("eventhub_token");
    });
    expect(tokendelete).toBeNull();
    console.log(storagedata);
})