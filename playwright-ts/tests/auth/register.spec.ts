import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import {
  generteTestUser,
  invalidUser,
  existingUser,
} from "../../utils/testData";

test.describe("User Registration", () => {
    
  test("should register a new user successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const user = generteTestUser();

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
});
