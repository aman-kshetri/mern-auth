import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login Page', () => {

    test('should display the login page', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(
            page.getByRole('heading', { name: 'Create account' })
        ).toBeVisible();
    });

    test('should switch from signup to login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.switchToLogin();

        await expect(
            page.getByRole('heading', { name: 'Login' })
        ).toBeVisible();
    });

    test('should switch from login to signup', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.switchToLogin();
        await loginPage.switchToSignup();

        await expect(
            page.getByRole('heading', { name: 'Create account' })
        ).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.switchToLogin();

    await loginPage.login(
      'wrong@example.com',
      'WrongPassword123'
    );

    await loginPage.expectToast('Invalid credentials');

    await expect(page).toHaveURL('/login');
  });

  test('should require email and password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.switchToLogin();

    await loginPage.submitButton.click();

    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(page).toHaveURL('/login');
  });

  test('should login successfully', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.switchToLogin();

  await loginPage.login(
    'aman@gmail.com',
    'Aman1234'
  );

  await expect(page).toHaveURL('/');

  await expect(
    page.getByText(/Hey/i)
  ).toBeVisible();
});
});