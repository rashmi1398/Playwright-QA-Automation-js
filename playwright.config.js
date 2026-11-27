// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  timeout: 30000,            // per-test timeout (top level)
  expect: {
    timeout: 10000,          // assertion timeout (top level)
  },

  use: {
    trace: 'on',
    headless: false,
    channel: 'chromium',   // uses the new headless mode, same engine as headed
    //viewport: { width: 1280, height: 720 },
  },

  projects: [
    //{
     //name: 'setup',
     //testMatch: '**/authsetup.spec.js',
    //},
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], 
        //storageState:'playwright/.auth/user.json',
      },
      //dependencies:['setup'],
      //testIgnore:['**/authsetup.spec.js',
      //'**/practicetests']
    },
  ],
});