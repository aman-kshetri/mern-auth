from playwright.sync_api import Page, expect

class Navbar:
    def __init__(self, page: Page):
        self.page = page

        self.avatar = page.locator("div.group")

        self.logout_option = page.get_by_text(
            "Logout",
            exact=True
        )

        self.login_button = page.get_by_role(
            "button",
            name="Login"
        )

    def logout(self):
        self.avatar.hover()

        expect(self.logout_option).to_be_visible()

        self.logout_option.click()

    def expect_logged_out(self):
        expect(self.login_button).to_be_visible()