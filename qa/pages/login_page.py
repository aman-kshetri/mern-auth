from playwright.sync_api import Page

class LoginPage:
    def __init__(self, page: Page):
        self.page = page

        self.full_name_input = page.get_by_placeholder("Full name")
        self.email_input = page.get_by_placeholder("Email id")
        self.password_input = page.get_by_placeholder("Password")

        self.signup_button = page.get_by_role(
            "button",
            name="Sign Up"
        )

        self.login_button = page.get_by_role(
            "button",
            name="Login"
        )

        self.login_here_link = page.get_by_text(
            "Login here",
            exact=True
        )

        self.signup_link = page.get_by_text(
            "Sign Up",
            exact=True
        )

        self.forgot_password_link = page.get_by_text(
            "Forgot password?",
            exact=True
        )
