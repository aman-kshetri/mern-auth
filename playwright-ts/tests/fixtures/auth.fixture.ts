import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

type AuthFixtures = {
  authenticatedPage: void;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.switchToLogin();

    await loginPage.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );

    await expect(page).toHaveURL('/');

    await expect(
      page.getByText(/Hey/i)
    ).toBeVisible();

    await use();
  },
});

export { expect };