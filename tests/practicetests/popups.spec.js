const {test, expect}=require('@playwright/test');
test('dialogs',async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
   
    page.once('dialog',async (dialog) =>{
        console.log(dialog.type())
        console.log(dialog.message())
        await dialog.accept("rashmi");
    })
    await page.getByRole("button", { name: "Click for JS Prompt" }).click();
    await page.getByRole("button", { name: "Click for JS Alert" }).click();
    //await page.getByRole("button", { name: "Click for JS Confirm" }).click();
    await expect(page.locator("#result")).toHaveText("You entered: rashmi");
})