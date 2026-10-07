import { test, expect } from '../fixtures/api.fixture';

test('should authenticate after successful login', async ({ api }) => {
  const loginResponse = await api.Login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  expect(loginResponse.status()).toBe(200);

  const loginBody = await loginResponse.json();
  expect(loginBody.success).toBe(true);

  const authResponse = await api.IsAuthenticated();

  expect(authResponse.status()).toBe(200);

  const authBody = await authResponse.json();

  expect(authBody.success).toBe(true);
  expect(authBody.message).toBe('User is authenticated');
});

test('should logout successfully', async ({ api }) => {
  await api.Login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  const logoutResponse = await api.Logout();

  expect(logoutResponse.status()).toBe(200);

  const logoutBody = await logoutResponse.json();

  expect(logoutBody.success).toBe(true);
  expect(logoutBody.message).toBe('Logged out');
});

test('should reject authenticated request after logout', async ({ api }) => {
  await api.Login(
    process.env.TEST_USER_EMAIL!,
    process.env.TEST_USER_PASSWORD!
  );

  const beforeLogout = await api.IsAuthenticated();

  expect(beforeLogout.status()).toBe(200);

  const beforeBody = await beforeLogout.json();
  expect(beforeBody.success).toBe(true);

  await api.Logout();

  const afterLogout = await api.IsAuthenticated();

  expect(afterLogout.status()).toBe(200);

  const afterBody = await afterLogout.json();

  expect(afterBody.success).toBe(false);
  expect(afterBody.message).toBe('Not authorized. Login again');
});

test('should reject authentication without token', async ({ api }) => {
  const response = await api.IsAuthenticated();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.success).toBe(false);
  expect(body.message).toBe('Not authorized. Login again');
});