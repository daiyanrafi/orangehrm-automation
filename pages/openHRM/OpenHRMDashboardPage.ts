import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export class OpenHRMDashboardPage extends BasePage {
  public dashboardHeader: Locator
  private applyLeaveMenu: Locator

  constructor(page: Page) {
    super(page)
    this.dashboardHeader = page.locator('h1:has-text("Dashboard")')
    this.applyLeaveMenu = page.locator('a#menu_leave_applyLeave')
  }

  async navigateToApplyLeave() {
    await this.clickButton(this.applyLeaveMenu)
  }
}
