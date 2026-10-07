// This is a test file for the Auth API using Playwright and TypeScript. It contains various test cases to validate the authentication endpoints of the API. The tests cover scenarios such as registration, login, authentication checks, logout, email verification, and password reset.
// This is without using fixtures. Remaining other separate test files are using fixtures. This file is kept for reference and can be removed if not needed.

// import { test, expect } from '@playwright/test';
// import { APIClient } from '../../utils/apiClient';

// test.describe('Auth API', () => {

//   test('should reject registration with missing details', async ({
//     request,
//   }) => {
//     const api = new APIClient(
//       request,
//       process.env.API_URL!
//     );

//     const response = await api.Register(
//       '',
//       '',
//       ''
//     );

//     expect(response.status()).toBe(200);

//     const body = await response.json();

//     expect(body.success).toBe(false);
//     expect(body.message).toBe('Missing details');
//   });


//   test('should reject registration with a short password', async ({
//     request,
//   }) => {
//     const api = new APIClient(
//       request,
//       process.env.API_URL!
//     );

//     const response = await api.Register(
//       'API Test User',
//       `api-${Date.now()}@example.com`,
//       '12345'
//     );

//     expect(response.status()).toBe(200);

//     const body = await response.json();

//     expect(body.success).toBe(false);
//     expect(body.message).toBe(
//       'Password must be at least 6 characters long'
//     );
//   });


//   test('should reject login with invalid credentials', async ({
//     request,
//   }) => {
//     const api = new APIClient(
//       request,
//       process.env.API_URL!
//     );

//     const response = await api.Login(
//       'does-not-exist@example.com',
//       'WrongPassword123'
//     );

//     expect(response.status()).toBe(200);

//     const body = await response.json();

//     expect(body.success).toBe(false);
//     expect(body.message).toBe('Invalid credentials');
//   });


//   test('should reject login with missing credentials', async ({
//     request,
//   }) => {
//     const api = new APIClient(
//       request,
//       process.env.API_URL!
//     );

//     const response = await api.Login(
//       '',
//       ''
//     );

//     expect(response.status()).toBe(200);

//     const body = await response.json();

//     expect(body.success).toBe(false);
//     expect(body.message).toBe(
//       'Email and password are required'
//     );
//   });


//   test('should reject authentication without a token', async ({
//     request,
//   }) => {
//     const api = new APIClient(
//       request,
//       process.env.API_URL!
//     );

//     const response = await api.IsAuthenticated();

//     expect(response.status()).toBe(200);

//     const body = await response.json();

//     expect(body.success).toBe(false);
//     expect(body.message).toBe(
//       'Not authorized. Login again'
//     );
//   });


//   test('should reject password reset for an unknown email', async ({
//     request,
//   }) => {
//     const api = new APIClient(
//       request,
//       process.env.API_URL!
//     );

//     const response = await api.SendResetOtp(
//       'does-not-exist@example.com'
//     );

//     expect(response.status()).toBe(200);

//     const body = await response.json();

//     expect(body.success).toBe(false);
//     expect(body.message).toBe('User not found');
//   });

//   test('should register a new user successfully', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const email = `api-${Date.now()}@example.com`;

//   const response = await api.Register(
//     'API Test User',
//     email,
//     'Test@123456'
//   );

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(true);
//   expect(body.message).toBe('Registration successful');
// });

// test('should login successfully', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const response = await api.Login(
//     process.env.TEST_USER_EMAIL!,
//     process.env.TEST_USER_PASSWORD!
//   );

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(true);
//   expect(body.message).toBe('Login successful');
// });

// test('should authenticate after successful login', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const loginResponse = await api.Login(
//     process.env.TEST_USER_EMAIL!,
//     process.env.TEST_USER_PASSWORD!
//   );

//   expect(loginResponse.status()).toBe(200);

//   const loginBody = await loginResponse.json();

//   expect(loginBody.success).toBe(true);

//   const authResponse = await api.IsAuthenticated();

//   expect(authResponse.status()).toBe(200);

//   const authBody = await authResponse.json();

//   expect(authBody.success).toBe(true);
//   expect(authBody.message).toBe(
//     'User is authenticated'
//   );
// });

// test('should logout successfully', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   await api.Login(
//     process.env.TEST_USER_EMAIL!,
//     process.env.TEST_USER_PASSWORD!
//   );

//   const logoutResponse = await api.Logout();

//   expect(logoutResponse.status()).toBe(200);

//   const logoutBody = await logoutResponse.json();

//   expect(logoutBody.success).toBe(true);
//   expect(logoutBody.message).toBe('Logged out');
// });

// test('should reject authenticated request after logout', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   await api.Login(
//     process.env.TEST_USER_EMAIL!,
//     process.env.TEST_USER_PASSWORD!
//   );

//   const beforeLogout = await api.IsAuthenticated();

//   expect(beforeLogout.status()).toBe(200);

//   const beforeBody = await beforeLogout.json();

//   expect(beforeBody.success).toBe(true);

//   await api.Logout();

//   const afterLogout = await api.IsAuthenticated();

//   expect(afterLogout.status()).toBe(200);

//   const afterBody = await afterLogout.json();

//   expect(afterBody.success).toBe(false);
//   expect(afterBody.message).toBe(
//     'Not authorized. Login again'
//   );
// });

// test('should reject verification OTP request without authentication', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const response = await api.SendVerificationOtp();

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(false);
//   expect(body.message).toBe(
//     'Not authorized. Login again'
//   );
// });

// test('should reject an invalid email verification OTP', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const loginResponse = await api.Login(
//     process.env.TEST_USER_EMAIL!,
//     process.env.TEST_USER_PASSWORD!
//   );

//   expect(loginResponse.status()).toBe(200);

//   const loginBody = await loginResponse.json();

//   expect(loginBody.success).toBe(true);

//   const response = await api.VerifyEmail(
//     '000000'
//   );

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(false);
//   expect(body.message).toBe('Invalid OTP');
// });

// test('should send email verification OTP for an authenticated user', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const loginResponse = await api.Login(
//     process.env.TEST_USER_EMAIL!,
//     process.env.TEST_USER_PASSWORD!
//   );

//   expect(loginResponse.status()).toBe(200);

//   const loginBody = await loginResponse.json();

//   expect(loginBody.success).toBe(true);

//   const response = await api.SendVerificationOtp();

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(true);
//   expect(body.message).toBe(
//     'Verification OTP sent on Email'
//   );
// });

// test('should reject password reset when email is missing', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const response = await api.SendResetOtp('');

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(false);
//   expect(body.message).toBe('Email is required');
// });

// test('should reject password reset with missing details', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const response = await api.ResetPassword(
//     '',
//     '',
//     ''
//   );

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(false);
//   expect(body.message).toBe('Email, OTP and new password are required');
// });

// test('should reject password reset with an invalid OTP', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const otpResponse = await api.SendResetOtp(
//     process.env.TEST_USER_EMAIL!
//   );

//   expect(otpResponse.status()).toBe(200);

//   const otpBody = await otpResponse.json();

//   expect(otpBody.success).toBe(true);

//   const resetResponse = await api.ResetPassword(
//     process.env.TEST_USER_EMAIL!,
//     '000000',
//     'NewTest@123456'
//   );

//   expect(resetResponse.status()).toBe(200);

//   const resetBody = await resetResponse.json();

//   expect(resetBody.success).toBe(false);
//   expect(resetBody.message).toBe('Invalid OTP');
// });

// test('should reject password reset when new password is missing', async ({
//   request,
// }) => {
//   const api = new APIClient(
//     request,
//     process.env.API_URL!
//   );

//   const response = await api.ResetPassword(
//     process.env.TEST_USER_EMAIL!,
//     '000000',
//     ''
//   );

//   expect(response.status()).toBe(200);

//   const body = await response.json();

//   expect(body.success).toBe(false);
//   expect(body.message).toBe('Email, OTP and new password are required');
// });

// });