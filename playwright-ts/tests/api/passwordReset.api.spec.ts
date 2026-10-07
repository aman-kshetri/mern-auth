import { test, expect } from '../fixtures/api.fixture';

test('should reject password reset when email is missing', async ({ api }) => {
  const response = await api.SendResetOtp('');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Email is required');
});

test('should reject password reset with missing details', async ({ api }) => {
  const response = await api.ResetPassword('', '', '');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe(
    'Email, OTP and new password are required'
  );
});

test('should reject password reset with an invalid OTP', async ({ api }) => {
  const otpResponse = await api.SendResetOtp(
    process.env.TEST_USER_EMAIL!
  );

  expect(otpResponse.status()).toBe(200);

  const otpBody = await otpResponse.json();
  expect(otpBody.success).toBe(true);

  const resetResponse = await api.ResetPassword(
    process.env.TEST_USER_EMAIL!,
    '000000',
    'NewTest@123456'
  );

  expect(resetResponse.status()).toBe(200);

  const resetBody = await resetResponse.json();

  expect(resetBody.success).toBe(false);
  expect(resetBody.message).toBe('Invalid OTP');
});

test('should reject password reset when new password is missing', async ({ api }) => {
  const response = await api.ResetPassword(
    process.env.TEST_USER_EMAIL!,
    '000000',
    ''
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe(
    'Email, OTP and new password are required'
  );
});