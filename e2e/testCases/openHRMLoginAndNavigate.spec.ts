import { test, expect, Page } from '@playwright/test'
import { OpenHRMLoginPage } from '../../pages/openHRM/OpenHRMLoginPage'
import { OpenHRMDashboardPage } from '../../pages/openHRM/OpenHRMDashboardPage'
import { openHRMCredentials } from '../../fixtures/constants'

export default function openHRMLoginAndNavigateTests() {
  test.describe('Open HRM Login and Navigate Test Cases', () => {
    let page: Page
    let loginPage: OpenHRMLoginPage
    let dashboardPage: OpenHRMDashboardPage

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext()
      page = await context.newPage()

      loginPage = new OpenHRMLoginPage(page)
      dashboardPage = new OpenHRMDashboardPage(page)
    })

    // test.describe.configure({ timeout: 240000 }); // Setting the timeout for all tests in this describe block

    test('Should login to Open HRM and navigate to Apply Leave', async () => {
      await loginPage.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      await loginPage.login(openHRMCredentials.username, openHRMCredentials.password)

      // Assertions
      await expect(dashboardPage.dashboardHeader).toBeVisible()

      // Navigate to Apply Leave
      await dashboardPage.navigateToApplyLeave()

      // Assertions for Apply Leave page
      await expect(page.locator('h1:has-text("Apply Leave")')).toBeVisible()
    })

    test('Login with invalid credentials', async () => {
      await loginPage.navigateTo('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
      await loginPage.invalidLogin('invalid_user', 'invalid_password')
      expect(await loginPage.isLoginErrorVisible()).toBe(true)
    })
  })
}
