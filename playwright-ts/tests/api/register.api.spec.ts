import { test, expect } from '../fixtures/api.fixture';

test('should reject registration with missing details', async ({ api }) => {
  const response = await api.Register('', '', '');

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Missing details');
});

test('should reject registration with short password', async ({ api }) => {
  const response = await api.Register(
    'Test User',
    `short-${Date.now()}@example.com`,
    '123'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe(
    'Password must be at least 6 characters long'
  );
});

test('should register a new user successfully', async ({ api }) => {
  const email = `api-${Date.now()}@example.com`;

  const response = await api.Register(
    'API Test User',
    email,
    'Test@123456'
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(true);
  expect(body.message).toBe('Registration successful');
});