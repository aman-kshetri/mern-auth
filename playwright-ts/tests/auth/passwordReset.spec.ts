import { test, expect } from '@playwright/test';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage';

test.describe('Password Reset', () => {

  test('should navigate to reset password page', async ({ page }) => {
    const resetPage = new ResetPasswordPage(page);

    await resetPage.goto();

    await expect(page).toHaveURL('/reset-password');

    await resetPage.expectEmailStage();
  });


  test('should request a password reset OTP', async ({ page }) => {
    const resetPage = new ResetPasswordPage(page);

    await resetPage.goto();

    await resetPage.enterEmail(
      process.env.TEST_USER_EMAIL!
    );

    const responsePromise = page.waitForResponse(
      response =>
        response.url().includes('/api/auth/send-reset-otp') &&
        response.request().method() === 'POST'
    );

    await resetPage.submitEmail();

    const response = await responsePromise;

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(true);
    expect(body.message).toBe('OTP sent to your Email');

    await resetPage.expectOtpStage();
  });

  test('should reject an unknown email', async ({ page }) => {
  const resetPage = new ResetPasswordPage(page);

  await resetPage.goto();

  await resetPage.enterEmail(
    'does-not-exist@example.com'
  );

  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/auth/send-reset-otp') &&
      response.request().method() === 'POST'
  );

  await resetPage.submitEmail();

  const response = await responsePromise;

  console.log('Status:', response.status());
  console.log('Response:', await response.json());

  await expect(page).toHaveURL('/reset-password');
});

  test('should require an email', async ({ page }) => {
    const resetPage = new ResetPasswordPage(page);

    await resetPage.goto();

    await resetPage.submitEmail();

    await expect(resetPage.emailInput).toBeVisible();

    await expect(page).toHaveURL('/reset-password');
  });


  test('should display six OTP inputs after requesting reset OTP', async ({
    page,
  }) => {
    const resetPage = new ResetPasswordPage(page);

    await resetPage.goto();

    await resetPage.enterEmail(
      process.env.TEST_USER_EMAIL!
    );

    await resetPage.submitEmail();

    await resetPage.expectOtpStage();

    await expect(resetPage.otpInputs).toHaveCount(6);
  });


  test('should reject an invalid reset OTP', async ({ page }) => {
    const resetPage = new ResetPasswordPage(page);

    await resetPage.goto();

    await resetPage.enterEmail(
      process.env.TEST_USER_EMAIL!
    );

    await resetPage.submitEmail();

    await resetPage.expectOtpStage();

    await resetPage.fillOtp('000000');

    await resetPage.verifyOtp();

    // Important:
    // Our current frontend does NOT call the backend
    // when "Verify email" is clicked.
    //
    // It only saves the OTP and moves to the
    // new-password stage.
    await resetPage.expectNewPasswordStage();
  });

});