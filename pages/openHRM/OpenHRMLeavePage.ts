import { BasePage } from "@pages/BasePage";
import { Page, Locator } from "@playwright/test";

export class OpenHRMLeavePage extends BasePage {
  private leaveTypeDropdown: Locator;
  private selectOption: Locator;
  private fromDateInput: Locator;
  private selectFromDate: Locator;
  // private toDateInput: Locator;
  // private selectToDate: Locator;
  private reasonInput: Locator;
  private applyButton: Locator;
  // private updateButton: Locator;
  // private cancelButton: Locator;

  private myLeave: Locator;
  private leaveListButton: Locator;
  private commentHere: Locator;
  private addCommentButton: Locator;
  private saveButton: Locator;
  private updatedText: Locator;
  private cancelButton: Locator;

  constructor(page: Page) {
    super(page);
    // this.leaveTypeDropdown = page.locator('select[name="leaveType"]');
    // this.leaveTypeDropdown = page.locator('.oxd-select-text--active');
    // this.leaveTypeDropdown = page.locator('.oxd-select-dropdown--active .oxd-select-option');
    // this.leaveTypeDropdown = page.locator('.oxd-select-text-input');
    // this.leaveTypeDropdown = page.locator('div .oxd-select-text-input');
    // this.leaveTypeDropdown = page.getByText("-- Select --");
    // this.leaveTypeDropdown = page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2);
    this.leaveTypeDropdown = page.getByText('-- Select --').first();
    this.selectOption = page.getByRole('option', { name: 'CAN - FMLA' });
    // this.fromDateInput = page.locator('input[name="fromDate"]');
    // this.fromDateInput = page.locator("form i").nth(2);
    this.fromDateInput = page.getByPlaceholder('dd-mm-yyyy').first();
    this.selectFromDate = page.getByText('14');
    // this.toDateInput = page.locator('input[name="toDate"]');
    // this.toDateInput = page.locator("form i").nth(3);
    // this.toDateInput = page.getByPlaceholder('dd-mm-yyyy').nth(1);
    // this.selectToDate = page.getByText('16');
    // this.reasonInput = page.locator('textarea[name="reason"]');
    // this.reasonInput = page.getByPlaceholder("Comment here");
    this.reasonInput = page.locator('textarea');
    // this.applyButton = page.locator('button:has-text("Apply")');
    this.applyButton = page.getByRole('button', { name: 'Apply' });


    // this.updateButton = page.locator('button:has-text("Update")');
    // this.cancelButton = page.locator('button:has-text("Cancel")');
    this.myLeave = page.getByRole('link', { name: 'My Leave' });
    this.leaveListButton = page.getByRole("button", { name: "" });
    this.leaveListButton = page.getByRole('row', { name: ' 2024-15-08 aaa oEQii wQAqg' }).getByRole('listitem').getByRole('button');
    this.addCommentButton = page.getByText("Add Comment");
    this.commentHere = page.getByPlaceholder('Comment here');
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.updatedText = page.getByText("Family-GG-1");
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  // async applyLeave( leaveType: string, fromDate: string, toDate: string, reason: string
  async applyLeave( reason: string) {
    // await this.leaveTypeDropdown.selectOption({ label: leaveType });
    await this.clickButton(this.leaveTypeDropdown)
    await this.clickButton(this.selectOption)
    await this.clickButton(this.fromDateInput)
    await this.clickButton(this.selectFromDate)
    // await this.clickButton(this.toDateInput)
    // await this.clickButton(this.selectToDate)

    // await this.selectLeaveType(leaveType);
    // await this.fillInput(this.fromDateInput, fromDate);
    // await this.fillInput(this.toDateInput, toDate);
    await this.fillInput(this.reasonInput, reason);
    await this.clickButton(this.applyButton);
  }

  // getByRole('option', { name: 'CAN - FMLA' })

  // async updateLeave(fromDate: string, toDate: string, reason: string) {
  async updateLeave(updatedReason: string) {
    await this.clickButton(this.myLeave);
    await this.clickButton(this.leaveListButton);
    await this.clickButton(this.addCommentButton);
    await this.clickButton(this.commentHere);
    // await this.fillInput(this.fromDateInput, fromDate);
    // await this.fillInput(this.toDateInput, toDate);
    await this.fillInput(this.reasonInput, updatedReason);
    await this.clickButton(this.saveButton);
  }

  async cancelLeave(fromDate: string) {
    await this.clickButton(this.leaveListButton);
    await this.clickButton(this.cancelButton);

    // await this.fillInput(this.fromDateInput, fromDate);
    // await this.clickButton(this.cancelButton);
  }

  async updatedLeaveComment(): Promise<boolean> {
    return this.updatedText.isVisible();
  }

  // private async selectLeaveType(leaveType: string) {
  //   await this.leaveTypeDropdown.click(); // Click to open the dropdown

  //   // Wait for the options to be visible
  //   const options = this.page.locator('.oxd-select-dropdown--active .oxd-select-option');
  //   await options.first().waitFor();

  //   // Click the option with the text matching the leaveType
  //   const option = options.locator(`text=${leaveType}`);
  //   await option.click();
  // }
}
