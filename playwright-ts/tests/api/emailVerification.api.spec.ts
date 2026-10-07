import { test, expect } from '../fixtures/api.fixture';

test('should reject verification OTP request without authentication', async ({ api }) => {
  const response = await api.SendVerificationOtp();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Not authorized. Login again');
});

test('should reject an invalid email verification OTP', async ({ api }) => {
  const loginResponse = await api.Login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  expect(loginBody.success).toBe(true);

  const response = await api.VerifyEmail('000000');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Invalid OTP');
});

test('should send email verification OTP for authenticated user', async ({ api }) => {
  const loginResponse = await api.Login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  expect(loginBody.success).toBe(true);

  const response = await api.SendVerificationOtp();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe('Verification OTP sent on Email');
});