import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import {
  generateTestUser,
  invalidUser,
  existingUser,
} from "../../utils/testData";

test.describe("User Registration", () => {
  test("should register a new user successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = generateTestUser();

    await loginPage.goto();
    await loginPage.expectSignUpPage();

    await loginPage.register(user.username, user.email, user.password);
    await expect(page).toHaveURL("/");

    await expect(page.getByText(`Hey ${user.username}!`)).toBeVisible();
  });

  test("should require all registration fields", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.submitButton.click();

    await expect(loginPage.nameInput).toBeVisible();

    await expect(loginPage.emailInput).toBeVisible();

    await expect(loginPage.passwordInput).toBeVisible();

    await expect(page).toHaveURL("/login");
  });

  test("should reject an invalid email format", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.nameInput.fill("Test User");

    await loginPage.emailInput.fill("invalid-email");

    await loginPage.passwordInput.fill("Password1234");

    await loginPage.submitButton.click();

    await expect(page).toHaveURL("/login");
  });

  test("should reject a password shorter than 6 characters", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const user = generateTestUser();

    await loginPage.register(user.username, user.email, "123");

    await loginPage.expectToast("Password must be at least 6 characters long");

    await expect(page).toHaveURL("/login");
  });

  test('should reject registration with an existing email', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const user = generateTestUser();

  await loginPage.goto();

  // First registration
  await loginPage.register(
    user.username,
    user.email,
    user.password
  );

  await expect(page).toHaveURL('/');

  // Return to registration page
  await page.goto('/login');

  // Login page starts in Sign Up mode
  await loginPage.expectSignUpPage();

  // Try registering the same email
  await loginPage.register(
    'Another User',
    user.email,
    user.password
  );

  await loginPage.expectToast(
    'User already exists'
  );
});
});
