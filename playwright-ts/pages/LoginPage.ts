import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly forgotPassword: Locator;
  readonly loginHere: Locator;
  readonly signupLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.getByPlaceholder("Full name");
    this.emailInput = page.getByPlaceholder("Email id");
    this.passwordInput = page.getByPlaceholder("Password");
    this.submitButton = page.getByRole("button", { name: /sign up|login/i });
    this.forgotPassword = page.getByText("Forgot password?");
    this.loginHere = page.getByText("Login here");
    this.signupLink = page.getByText("Sign Up");
  }

  async goto() {
    await this.page.goto("/login");
  }

  async expectSignUpPage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Create account',
      })
    ).toBeVisible();
    await expect(this.nameInput).toBeVisible();
  }

  async expectLoginPage() {
    await expect(
      this.page.getByRole('heading', {
        name: 'Login',
      })
    ).toBeVisible();
    await expect(this.nameInput).not.toBeVisible();
  }

  async switchToLogin() {
    await this.loginHere.click();
    await this.expectLoginPage();
  }

  async switchToSignup() {
    await this.signupLink.click();
    await this.expectSignUpPage();
  }

  async register(
    name: string,
    email: string,
    password: string,
  ) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await this.submitButton.click()
  }

  async login(
    email: string,
    password: string,
  ) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    
    await this.submitButton.click()
  }

  async gotoResetPassword() {
    await this.forgotPassword.click();
  }

  async expectToast(message: string) {
    await expect(
      this.page.getByText(message)
    ).toBeVisible();
  }
}
