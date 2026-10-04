import { expect, Locator, Page } from '@playwright/test';

export class EmailVerifyPage {
  readonly page: Page;
  readonly otpInputs: Locator;
  readonly verifyButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.otpInputs = page.locator('input');
    this.verifyButton = page.getByRole('button', {
      name: /verify/i,
    });
  }

  async expectPage() {
    await expect(
      this.page.getByRole('heading', { name: /verify/i })
    ).toBeVisible();

    await expect(this.verifyButton).toBeVisible();
  }

  async fillOtp(otp: string) {
    for (let i = 0; i < otp.length; i++) {
      await this.otpInputs.nth(i).fill(otp[i]);
    }
  }

  async verify() {
    await this.verifyButton.click();
  }

  async expectToast(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}