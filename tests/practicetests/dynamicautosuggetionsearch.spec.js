const { test, expect } = require('@playwright/test');

/*test('Headless application loading check', async ({ page }) => {
    await page.goto("https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_7hz2t19t5c_e&adgrpid=155259815513&hvpone=&hvptwo=&hvadid=831286012769&hvpos=&hvnetw=g&hvrand=5732122142562347415&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062117&hvtargid=kwd-10573980&hvcampaign=20577402623&hydadcr=14453_2486916&mcid=4c22dcdee2bf3a71b0b832c5c4ba9c17&hvocijid=5732122142562347415--&hvexpln=nav&gad_source=1")
    const search = await page.locator("#twotabsearchtextbox").pressSequentially("iphon",{delay:200})
    //await page.pause();
    const autosuggetion = await page.locator("#sac-autocomplete-results-container").getByRole("button", { name:"iphone 17 pro",exact:true}).click();
    
    await expect(page.locator('span[class="a-color-state a-text-bold"]')).toHaveText('"iphone 17 pro"')
})*/

test('Headless application', async ({ page }) => {
    await page.goto("https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_7hz2t19t5c_e&adgrpid=155259815513&hvpone=&hvptwo=&hvadid=831286012769&hvpos=&hvnetw=g&hvrand=5732122142562347415&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9062117&hvtargid=kwd-10573980&hvcampaign=20577402623&hydadcr=14453_2486916&mcid=4c22dcdee2bf3a71b0b832c5c4ba9c17&hvocijid=5732122142562347415--&hvexpln=nav&gad_source=1")
    const search = await page.locator("#twotabsearchtextbox").pressSequentially("iphon", { delay: 200 })
    //await page.pause();
    const autosuggetion = page.locator(".left-pane-results-container")
    
    const containeritems = autosuggetion.locator('div[role="row"]')
    //const containertextcontent = await containeritems.nth(0).textContent()
    await expect(containeritems.first()).toBeVisible()
    const count = await containeritems.count();
    console.log(count)

})

