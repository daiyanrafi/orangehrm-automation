import { test, expect, Page } from "@playwright/test";
import { OpenHRMLoginPage } from "../../pages/openHRM/OpenHRMLoginPage";
import { OpenHRMDashboardPage } from "../../pages/openHRM/OpenHRMDashboardPage";
import { openHRMCredentials } from "../../fixtures/constants";
import { OpenHRMLeavePage } from "@pages/openHRM/OpenHRMLeavePage";

export default function openHRMLoginAndNavigateTests() {
  test.describe("Open HRM Login and Navigate Test Cases", () => {
    let page: Page;
    let loginPage: OpenHRMLoginPage;
    let dashboardPage: OpenHRMDashboardPage;
    let leavePage: OpenHRMLeavePage;

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext();
      page = await context.newPage();

      loginPage = new OpenHRMLoginPage(page);
      dashboardPage = new OpenHRMDashboardPage(page);
      leavePage = new OpenHRMLeavePage(page);

      await loginPage.navigateTo("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      await loginPage.login(openHRMCredentials.username, openHRMCredentials.password);

      // Verify successful login
      await expect(dashboardPage.dashboardHeader).toBeVisible();
    });

    // test.describe.configure({ timeout: 240000 }); // Setting the timeout for all tests in this describe block

    test("Should login to Open HRM and navigate to Apply Leave", async () => {
      // await loginPage.navigateTo(
      //   "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
      // );
      // await loginPage.login(
      //   openHRMCredentials.username,
      //   openHRMCredentials.password
      // );
      // await page.waitForTimeout(5000); // 5 seconds gg

      // // Assertions
      // await expect(dashboardPage.dashboardHeader).toBeVisible();

      // Navigate to Apply Leave
      await dashboardPage.navigateToApplyLeave();

      await page.waitForTimeout(5000); // 5 seconds gg
      // Assertions for Apply Leave page
      await expect(dashboardPage.applyLeaveHeader).toBeVisible();
      // await expect(page.locator('h1:has-text("Apply Leave")')).toBeVisible();
    });

    // test("Login with invalid credentials", async () => {
    //   await loginPage.navigateTo(
    //     "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    //   );
    //   await loginPage.invalidLogin("invalid_user", "invalid_password");
    //   await page.waitForTimeout(5000); // 5 seconds gg
    //   expect(await loginPage.isLoginErrorVisible()).toBe(true);
    // });

    test("Should apply for leave", async () => {
      await dashboardPage.navigateToApplyLeave();
      await page.waitForTimeout(5000); // 5 seconds gg

      // Apply for leave
      // await leavePage.applyLeave('CAN - FMLA', "2023-08-10", "2023-08-11", "Family-GG-1");
      await leavePage.applyLeave("Family-GG-1");
      // await expect( page.locator("text=Leave Applied Successfully")).toBeVisible();
    });

    test("Should update the applied leave", async () => {
      await dashboardPage.navigateToApplyLeave();

      // Update leave
      await leavePage.updateLeave("Updated reason");
      // await expect(page.locator("text=Leave Updated Successfully")).toBeVisible();
      expect(await leavePage.updatedLeaveComment()).toBe(true);
    });

    test("Should cancel the updated leave", async () => {
      await dashboardPage.navigateToApplyLeave();

      // Cancel leave
      await leavePage.cancelLeave("2023-08-10");
      await expect(
        page.locator("text=Leave Canceled Successfully")
      ).toBeVisible();
    });
  });

  test.describe("Open HRM Invalid Login Test Case", () => {
    let page: Page;
    let loginPage: OpenHRMLoginPage;

    test.beforeAll(async ({ browser }) => {
      const context = await browser.newContext();
      page = await context.newPage();
      loginPage = new OpenHRMLoginPage(page);
    });

    test("Login with invalid credentials", async () => {
      await loginPage.navigateTo("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
      await loginPage.invalidLogin("invalid_user", "invalid_password");
      await page.waitForTimeout(5000); // 5 seconds wait
      expect(await loginPage.isLoginErrorVisible()).toBe(true);
    });
  });
}
