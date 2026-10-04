import { expect, Locator, Page } from '@playwright/test';

export class ResetPasswordPage {
  readonly page: Page;

  readonly emailInput: Locator;
  readonly otpInputs: Locator;
  readonly passwordInput: Locator;

  readonly submitButton: Locator;
  readonly verifyEmailButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Email id');

    this.otpInputs = page.locator(
      'input[type="text"][maxlength="1"]'
    );

    this.passwordInput = page.getByPlaceholder('Password');

    this.submitButton = page.getByRole('button', {
      name: 'Submit',
    });

    this.verifyEmailButton = page.getByRole('button', {
      name: 'Verify email',
    });
  }

  async goto() {
    await this.page.goto('/reset-password');
  }

  async expectEmailStage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Reset password',
      })
    ).toBeVisible();

    await expect(this.emailInput).toBeVisible();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async submitEmail() {
    await this.submitButton.click();
  }

  async expectOtpStage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Reset password OTP',
      })
    ).toBeVisible();

    await expect(this.otpInputs).toHaveCount(6);
  }

  async fillOtp(otp: string) {
    for (let i = 0; i < otp.length; i++) {
      await this.otpInputs.nth(i).fill(otp[i]);
    }
  }

  async verifyOtp() {
    await this.verifyEmailButton.click();
  }

  async expectNewPasswordStage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'New password',
      })
    ).toBeVisible();

    await expect(this.passwordInput).toBeVisible();
  }

  async enterNewPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitNewPassword() {
    await this.submitButton.click();
  }

  async expectToast(message: string) {
    await expect(this.page.getByText(message)).toBeVisible();
  }
}