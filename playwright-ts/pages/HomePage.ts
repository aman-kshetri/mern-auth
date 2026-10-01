import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly verifyEmailButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole("button", {
      name: /login/i,
    });
    this.logoutButton = page.getByText("Logout");
    this.verifyEmailButton = page.getByText("Verify Email");
  }

  async goto() {
    await this.page.goto("/");
  }

  async expectLoggedOut() {
    await expect(this.loginButton).toBeVisible();
  }

  async expectLoggedIn() {
    await expect(this.page.getByText(/Hey/i)).toBeVisible();
  }

  async openUserMenu() {
    await this.page.locator(".group").hover();
  }

  async logout() {
    await this.openUserMenu();

    await this.logoutButton.click();
  }

  async verifyEmail() {
    await this.openUserMenu();

    await this.verifyEmailButton.click();
  }
}
