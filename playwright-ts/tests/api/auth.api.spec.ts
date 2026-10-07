import { test, expect } from '@playwright/test';
import { APIClient } from '../../utils/apiClient';

test.describe('Auth API', () => {

  test('should reject registration with missing details', async ({
    request,
  }) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    const response = await api.Register(
      '',
      '',
      ''
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('Missing details');
  });


  test('should reject registration with a short password', async ({
    request,
  }) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    const response = await api.Register(
      'API Test User',
      `api-${Date.now()}@example.com`,
      '12345'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe(
      'Password must be at least 6 characters long'
    );
  });


  test('should reject login with invalid credentials', async ({
    request,
  }) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    const response = await api.Login(
      'does-not-exist@example.com',
      'WrongPassword123'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('Invalid credentials');
  });


  test('should reject login with missing credentials', async ({
    request,
  }) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    const response = await api.Login(
      '',
      ''
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe(
      'Email and password are required'
    );
  });


  test('should reject authentication without a token', async ({
    request,
  }) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    const response = await api.IsAuthenticated();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe(
      'Not authorized. Login again'
    );
  });


  test('should reject password reset for an unknown email', async ({
    request,
  }) => {
    const api = new APIClient(
      request,
      process.env.API_URL!
    );

    const response = await api.SendResetOtp(
      'does-not-exist@example.com'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.success).toBe(false);
    expect(body.message).toBe('User not found');
  });

  test('should register a new user successfully', async ({
  request,
}) => {
  const api = new APIClient(
    request,
    process.env.API_URL!
  );

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

});