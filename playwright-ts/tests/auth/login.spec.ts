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
})