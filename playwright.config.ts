import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import("dotenv/config");

const testDir = defineBddConfig({
  features: '/feature/*.feature',
  steps: '/src/steps/*.ts',
});

export default defineConfig({
  testDir,
  timeout: 10 * 60 * 1000, // 10 minutes
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 10 * 60 * 1000, // 2 minutes
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 5 * 60 * 1000, // 2 minutes
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',

    headless: false,
    navigationTimeout: 5 * 60 * 1000, // 5 minutes
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: "on",
        contextOptions: {
          logger: {
            isEnabled: (name, severity) => false,
            log: (name, severity, message, args) => console.log(`${name} ${message}`)
          }
        }
      },
    },

    {
      name: 'firefox',

      use: {
        ...devices['Desktop Firefox'],
        screenshot: "on",
        contextOptions: {
          logger: {
            isEnabled: (name, severity) => false,
            log: (name, severity, message, args) => console.log(`${name} ${message}`)
          },

        }

      },
    },

    {
      name: 'chromium',
      dependencies: ['setup'],
      use: {
        storageState: 'playwright/.auth/user.json',
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: 'test-results/',
});