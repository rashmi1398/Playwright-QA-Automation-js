const {test,expect} = require('@playwright/test');
test.use({
    storageState:'playwright/.auth/user.json'
})
test("logintestcase",async({page})=>{
    
    await page.goto("https://eventhub.rahulshettyacademy.com/events");
    await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    await page.locator("#nav-events").click();
    await expect(page.locator("#event-card").nth(0)).toBeVisible()
    await page.locator('a button[type="button"]').click();
    await expect(page.locator("#event-title-input")).toBeVisible();
    await page.locator("#event-title-input").fill("sanjit hegde concert")
    await page.locator("#category").selectOption("Concert")
    await page.locator("#city").fill("belgaum")
    await page.locator("#venue").fill("KLE college ground")
    await page.locator('input[id="event-date-&-time"]').fill("2026-12-20T10:30");
    await page.locator('input[id="price-($)"]').fill("50")
    await page.locator("#total-seats").fill("1000")
    await page.locator('div button[type="submit"]').click();
    await expect(page.getByText('Event created!',{exact:true})).toBeVisible();
    
    await page.locator("#nav-events").click();
    const eventcard = page.locator("article").filter({has:page.getByRole("heading", {name:"sanjit hegde concert"})
});
    await eventcard.getByRole("link", { name:"Book Now"}).click();
    await expect(page.locator("div h1")).toBeVisible();
    for(let i=0;i<6;i++){
        await page.getByRole("button", { name: "+" }).click();
    }
    
    await expect(page.locator("#ticket-count")).toHaveText("7")
    await page.locator("#customerName").fill("somu");
    await page.locator("#customer-email").fill("somu@gmail.com");
    await page.locator("#phone").fill("2368465781");
   
    await page.locator("#confirm-booking").click();
    await expect(page.locator(".text-xl.font-bold.text-gray-900.mb-1")).toHaveText("Booking Confirmed! 🎉")
    const refuniqueid = await page.locator(".booking-ref").textContent()
    await page.getByRole("button", { name:"View My Bookings"}).click()
    await expect(page.getByText("View and manage all your ticket bookings")).toBeVisible();
    await page.waitForLoadState("load");
    
    await page.locator("#nav-bookings").click();
    await expect(page.locator("#booking-card").nth(0)).toBeVisible();
    const bookingconfirm = page.locator("#booking-card");
    const count =  await bookingconfirm.count();
    for(let i=0;i<=count-1;i++){
        let  card = bookingconfirm.nth(i)
        const uniqueid = await card.locator(".booking-ref").textContent()
        console.log("The uniqueid: " +uniqueid);
        if(await uniqueid == refuniqueid){
            await card.getByRole("button", { name:"View Details"}).click();
            break;
        }
        
        
      
    }
    await expect(page.locator("div h2").nth(0)).toBeVisible();
    

    await page.getByRole("button", { name:"Admin"}).click();
    const manageBookings = page.getByRole("link", { name: "Manage Bookings" });
    await expect(manageBookings).toBeVisible();
    await manageBookings.click();
    await page.locator("select").selectOption("confirmed")
    await expect(page.locator("tbody tr").first()).toBeVisible({timeout:9000});
    const table = page.locator('table[class="w-full text-sm"]')
    const rows =  table.locator("tbody tr")
    const countrows = await rows.count();
    let found = false;
    for (let i = 0; i < countrows; i++) {
        const row = rows.nth(i)
        console.log(await row.textContent());
        
        const rowsdata = row.locator("td")
        const countdata = await rowsdata.count();
        for (let j = 0; j < countdata; j++) {
            const cell = rowsdata.nth(j)
            const rowsdataref = await cell.textContent();
            if (refuniqueid == rowsdataref) {
                console.log("data:" + rowsdataref)
                await row.getByRole("button", { name: "Cancel" }).click();
                found=true;
                break;
                
            }
          
        }
        if(found){
            break;
        }
         
    }

    await page.locator("#confirm-dialog-yes").click();


    
})