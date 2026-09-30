from playwright.sync_api import Page, expect

class HomePage:
    def __init__(self, page: Page):
        self.page = page

    def expect_user_logged_in(self, name):
        expect(self.page).to_have_url(
            "http://localhost:5173/"
        )

        expect(
            self.page.get_by_text(f"Hey {name}!")
        ).to_be_visible()