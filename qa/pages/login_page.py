from playwright.sync_api import Page, expect

class LoginPage:
    def __init__(self, page: Page):
        self.page = page

        self.full_name_input = page.get_by_placeholder("Full name")
        self.email_input = page.get_by_placeholder("Email id")
        self.password_input = page.get_by_placeholder("Password")
        self.signup_button = page.get_by_role("button", name="Sign Up")
        self.login_here_link = page.get_by_text("Login here", exact=True)

        self.login_button = page.get_by_role("button", name="Login")
        self.forgot_password_link = page.get_by_text("Forgot password?", exact=True)
        self.signup_link = page.get_by_text("Sign Up", exact=True)

    def open(self):
        self.page.goto("http://localhost:5173/login")

    def switch_to_login(self):
        self.login_here_link.click()

    def switch_to_signup(self):
        self.signup_link.click()

    def register(self, name, email, password):
        self.full_name_input.fill(name)
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.signup_button.click()

    def login(self, email, password):
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.login_button.click()

    def click_forgot_password(self):
        self.forgot_password_link.click()

    def expect_signup_form_visible(self):
        expect(
            self.page.get_by_role(
                "heading",
                name="Create account"
            )
        ).to_be_visible()

        expect(
            self.page.get_by_text(
                "Create your account"
            )
        ).to_be_visible()

        expect(self.full_name_input).to_be_visible()
        expect(self.email_input).to_be_visible()
        expect(self.password_input).to_be_visible()
        expect(self.signup_button).to_be_visible()

    def expect_login_form_visible(self):
        expect(
            self.page.get_by_role(
                "heading",
                name="Login"
            )
        ).to_be_visible()

        expect(
            self.page.get_by_text(
                "Login to your account!"
            )
        ).to_be_visible()

        expect(self.email_input).to_be_visible()
        expect(self.password_input).to_be_visible()
        expect(self.login_button).to_be_visible()