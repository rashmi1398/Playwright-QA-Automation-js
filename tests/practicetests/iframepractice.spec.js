const {test, expect}=require('@playwright/test');
test('browsercontext',async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/iframe?utm_source=chatgpt.com")
    const frame = page.frameLocator("#mce_0_ifr");
    await frame.locator("body p").fill("Rashmi");
    expect(frame.locator("body p")).toHaveText("Rashmi",{exact:true})

})
test('multipleiframe',async({page})=>{
    await page.goto("https://demoqa.com/frames");
    const frame1 = page.frameLocator("#frame1")
    await expect(frame1.locator("#sampleHeading")).toHaveText("This is a sample page")
    const frame2 = page.frameLocator("#frame2")
    await expect(frame2.locator("#sampleHeading")).toHaveText("This is a sample page")
})

test('nestediframes',async({page})=>{
    await page.goto("https://demoqa.com/nestedframes");
    const frame1 = page.frameLocator("#frame1")
    const frame2 = frame1.frameLocator('[srcdoc="<p>Child Iframe</p>"]');
    await expect(frame2.locator("body p")).toHaveText("Child Iframe");
})