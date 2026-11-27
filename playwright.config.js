
// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  timeout: 30000,

  expect: {
    timeout: 10000,
  },

  use: {
    trace: 'on',
    headless: !!process.env.CI,
    channel: 'chromium',
  },

  projects: [
    ...(process.env.CI ? [
      {
        name: 'setup',
        testMatch: '**/.auth/authsetup.spec.js',

      }
    ] : []),
    // Actual application tests

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome']
      },
      dependencies: process.env.CI ? ['setup'] : [],
      testIgnore: [
        '**/.auth/authsetup.spec.js',
        ...(process.env.CI ? ['**/practicetests/**'] : [])
      ]
    }

  ]


});
