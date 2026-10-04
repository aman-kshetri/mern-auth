import { test, expect } from '../fixtures/auth.fixture';
import { HomePage } from '../../pages/HomePage';
import { EmailVerifyPage } from '../../pages/EmailVerifyPage';

test.describe('Email Verification', () => {

  test('should open the email verification page', async ({
    page,
    authenticatedPage,
  }) => {
    const homePage = new HomePage(page);
    const emailVerifyPage = new EmailVerifyPage(page);

    await expect(page).toHaveURL('/');

    await homePage.verifyEmail();

    await expect(page).toHaveURL('/email-verify');

    await emailVerifyPage.expectPage();
  });

  test('should request a verification OTP', async ({
  page,
  authenticatedPage,
}) => {
  const homePage = new HomePage(page);

  await expect(page).toHaveURL('/');

  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/auth/send-verify-otp') &&
      response.request().method() === 'POST'
  );

  await homePage.verifyEmail();

  const response = await responsePromise;

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe('Verification OTP sent on Email');

  await expect(page).toHaveURL('/email-verify');
});

test('should display six OTP inputs', async ({
  page,
  authenticatedPage,
}) => {
  const homePage = new HomePage(page);
  const emailVerifyPage = new EmailVerifyPage(page);

  await homePage.verifyEmail();

  await emailVerifyPage.expectPage();

  await expect(emailVerifyPage.otpInputs).toHaveCount(6);
});

test('should allow entering a six digit OTP', async ({
  page,
  authenticatedPage,
}) => {
  const homePage = new HomePage(page);
  const emailVerifyPage = new EmailVerifyPage(page);

  await homePage.verifyEmail();

  await emailVerifyPage.fillOtp('123456');

  for (let i = 0; i < 6; i++) {
    await expect(
      emailVerifyPage.otpInputs.nth(i)
    ).toHaveValue('123456'[i]);
  }
});

test('should reject an invalid OTP', async ({
  page,
  authenticatedPage,
}) => {
  const homePage = new HomePage(page);
  const emailVerifyPage = new EmailVerifyPage(page);

  await homePage.verifyEmail();

  await emailVerifyPage.fillOtp('000000');

  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/api/auth/verify-account') &&
      response.request().method() === 'POST'
  );

  await emailVerifyPage.verify();

  const response = await responsePromise;

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Invalid OTP');

  await emailVerifyPage.expectToast('Invalid OTP');
});

});