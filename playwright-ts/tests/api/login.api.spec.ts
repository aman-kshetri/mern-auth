import { test, expect } from '../fixtures/api.fixture';

test('should reject login with invalid credentials', async ({ api }) => {
  const response = await api.Login(
    process.env.TEST_USER_EMAIL!,
    'WrongPassword123'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Invalid credentials');
});

test('should reject login with missing credentials', async ({ api }) => {
  const response = await api.Login('', '');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Email and password are required');
});

test('should login successfully', async ({ api }) => {
  const response = await api.Login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe('Login successful');
});