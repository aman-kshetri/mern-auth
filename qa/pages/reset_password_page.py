from playwright.sync_api import Page, expect


class ResetPasswordPage:
    def __init__(self, page: Page):
        self.page = page

        # Email step
        self.email_input = page.get_by_placeholder("Email id")
        self.submit_button = page.get_by_role(
            "button",
            name="Submit"
        )

        # OTP step
        self.otp_inputs = page.locator(
            'input[maxlength="1"]'
        )

        self.verify_email_button = page.get_by_role(
            "button",
            name="Verify email"
        )

        # New password step
        self.password_input = page.get_by_placeholder(
            "Password"
        )

    def open(self):
        self.page.goto(
            "http://localhost:5173/reset-password"
        )

    def submit_email(self, email):
        self.email_input.fill(email)
        self.submit_button.click()

    def expect_email_step(self):
        expect(
            self.page.get_by_role(
                "heading",
                name="Reset password"
            )
        ).to_be_visible()

        expect(
            self.page.get_by_text(
                "Enter your registered email address"
            )
        ).to_be_visible()

        expect(self.email_input).to_be_visible()
        expect(self.submit_button).to_be_visible()

    def expect_otp_step(self):
        expect(
            self.page.get_by_role(
                "heading",
                name="Reset password OTP"
            )
        ).to_be_visible()

        expect(
            self.page.get_by_text(
                "Enter the 6-digit code sent to your email"
            )
        ).to_be_visible()

        expect(self.otp_inputs).to_have_count(6)

        expect(
            self.verify_email_button
        ).to_be_visible()

    def enter_otp(self, otp):
        for index, digit in enumerate(otp):
            self.otp_inputs.nth(index).fill(digit)

    def verify_otp(self):
        self.verify_email_button.click()

    def expect_new_password_step(self):
        expect(
            self.page.get_by_role(
                "heading",
                name="New password"
            )
        ).to_be_visible()

        expect(
            self.page.get_by_text(
                "Enter the new password below"
            )
        ).to_be_visible()

        expect(self.password_input).to_be_visible()
        expect(self.submit_button).to_be_visible()

    def submit_new_password(self, password):
        self.password_input.fill(password)
        self.submit_button.click()