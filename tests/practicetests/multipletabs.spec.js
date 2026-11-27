const {test} = require('@playwright/test')
test("childpage",async({page,context})=>{
    await page.goto("http://playwrightautomation.com/practice.html?utm_source=chatgpt.com#section-browser-tabwindow")
    const [childpage]= await Promise.all([
     context.waitForEvent('page'),
        page.locator("#btn-open-pw-tab").click()
    ])
    const allpages = await context.pages();
    console.log("pages:"+allpages.length);
    await childpage.bringToFront();
    await childpage.waitForLoadState("domcontentloaded");
    await childpage.locator(".getStarted_Sjon").click();
    await childpage.close();
    
})
test("popup",async({page})=>{
    await page.goto("http://playwrightautomation.com/practice.html?utm_source=chatgpt.com#section-browser-tabwindow")
    const [popup]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator("#btn-open-pw-tab").click()
    ])
    await popup.bringToFront()
    await popup.locator(".getStarted_Sjon").click(); 
})

test("multipletabs",async({page,context})=>{
    await page.goto("http://playwrightautomation.com/practice.html?utm_source=chatgpt.com#section-browser-tabwindow")
context.on('page',async(newPage)=>{
    await newPage.waitForLoadState('domcontentloaded');
    console.log("page"+newPage.url())
})
    await page.locator("#browser-multi-tabs-btn").click()
})

/*const [popup] = await Promise.all([
    page.waitForEvent('popup'),
    page1.locator('#newtab').click()
]);*/ //here it will not able to open the new tab because it is not listening to the same page object
/*const [popup] = await Promise.all([
    context.waitForEvent('page'),
    page1.locator('#newtab').click()
]);*/ // here it will listens and opens new page
//the difference is if you use context.waitForEvent('page') it can listens any new page
//but for popup it will listens particular page event only so when you click button also you have to use same page button only