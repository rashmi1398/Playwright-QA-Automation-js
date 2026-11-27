const { test, expect } = require('@playwright/test');
test("sessionstoragecheck", async ({ page }) => {
    await page.goto("https://pathduck.github.io/test/session-storage/?utm_source=chatgpt.com");
    await page.locator('input[id="session"]').fill("Anu");
    await page.locator('input[type="button"]').nth(1).click();
    const sessionstoragedata = await page.evaluate(()=>{
    return Object.entries(sessionStorage)
    })
    console.log(sessionstoragedata);

    const sessionstoragespecificdata = await page.evaluate(() => {
        return sessionStorage.getItem("theirValue")
    })
    expect(sessionstoragespecificdata).not.toBeNull()
    console.log(sessionstoragespecificdata);

    const sessionstorageclear =await page.evaluate(()=>{
        return sessionStorage.clear();
    })
    const sessionstorageconfirm = await page.evaluate(()=>{
        return Object.entries(sessionStorage)
    })
    expect(sessionstorageconfirm).toHaveLength(0)

})

