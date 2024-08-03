import { Page, Locator } from '@playwright/test'
import { BasePage } from '../BasePage'

export class OpenHRMLoginPage extends BasePage {
  private usernameInput: Locator
  private passwordInput: Locator
  private loginButton: Locator
  private loginError: Locator

  constructor(page: Page) {
    super(page)
    this.usernameInput = page.locator('input#txtUsername')
    this.passwordInput = page.locator('input#txtPassword')
    this.loginButton = page.locator('input#btnLogin')
    this.loginError = page.locator('span#spanMessage')
  }

  async login(username: string, password: string) {
    await this.fillInput(this.usernameInput, username)
    await this.fillInput(this.passwordInput, password)
    await this.clickButton(this.loginButton)
  }

  async invalidLogin(username: string, password: string) {
    await this.fillInput(this.usernameInput, username)
    await this.fillInput(this.passwordInput, password)
    await this.clickButton(this.loginButton)
  }

  async isLoginErrorVisible(): Promise<boolean> {
    return this.loginError.isVisible()
  }
}
