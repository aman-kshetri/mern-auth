from playwright.sync_api import Page, expect
from pages.login_page import LoginPage
from pages.reset_password_page import ResetPasswordPage

# Test forgot password flow using Page Object Model (POM) pattern
def test_forgot_password_opens_reset_page(page: Page):
    login_page = LoginPage(page)
    reset_page = ResetPasswordPage(page)

    login_page.open()
    login_page.click_forgot_password()

    reset_page.expect_email_step()

# Test reset password flow using POM pattern
def test_reset_password_email_step(page: Page):
    reset_page = ResetPasswordPage(page)

    reset_page.open()

    reset_page.expect_email_step()

def test_otp_input_behavior(page: Page):
    reset_page = ResetPasswordPage(page)

    # Mock successful OTP request
    page.route(
        "**/api/auth/send-reset-otp",
        lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "message": "OTP sent"}'
        )
    )

    reset_page.open()

    # Submit email
    reset_page.submit_email("test@example.com")

    # Verify OTP screen
    reset_page.expect_otp_step()

    # Enter OTP
    reset_page.enter_otp("123456")

    # Verify each input contains the correct digit
    for index, digit in enumerate("123456"):
        assert reset_page.otp_inputs.nth(index).input_value() == digit

# Test transition from OTP step to new password step
def test_otp_to_new_password(page: Page):
    reset_page = ResetPasswordPage(page)

    # Mock successful "send reset OTP" response
    page.route(
        "**/api/auth/send-reset-otp",
        lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "message": "OTP sent"}'
        )
    )

    reset_page.open()

    # Submit email
    reset_page.submit_email("test@example.com")

    # Verify OTP step
    reset_page.expect_otp_step()

    # Enter OTP
    reset_page.enter_otp("123456")

    # Submit OTP
    reset_page.verify_otp()

    # Verify new password step
    reset_page.expect_new_password_step()

# Test the entire reset password flow including API request verification
def test_reset_password_submission(page: Page):
    reset_page = ResetPasswordPage(page)

    # Mock sending reset OTP
    page.route(
        "**/api/auth/send-reset-otp",
        lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "message": "OTP sent"}'
        )
    )

    reset_page.open()

    reset_page.submit_email("test@example.com")
    reset_page.expect_otp_step()

    reset_page.enter_otp("123456")
    reset_page.verify_otp()

    reset_page.expect_new_password_step()

    # Mock reset-password API
    page.route(
        "**/api/auth/reset-password",
        lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "message": "Password reset successful"}'
        )
    )

    # Wait for the actual API request while submitting
    with page.expect_request(
        "**/api/auth/reset-password"
    ) as request_info:

        reset_page.submit_new_password("NewPassword123")

    request = request_info.value

    # Verify request payload
    request_data = request.post_data_json

    assert request_data["email"] == "test@example.com"
    assert request_data["otp"] == "123456"
    assert request_data["newPassword"] == "NewPassword123"

    # Verify redirect to login
    expect(page).to_have_url(
        "http://localhost:5173/login"
    )

# Test backspace behavior in OTP inputs
def test_otp_backspace_behavior(page: Page):
    reset_page = ResetPasswordPage(page)

    page.route(
        "**/api/auth/send-reset-otp",
        lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "message": "OTP sent"}'
        )
    )

    reset_page.open()
    reset_page.submit_email("test@example.com")
    reset_page.expect_otp_step()

    otp_inputs = reset_page.otp_inputs

    # Enter first digit
    otp_inputs.nth(0).fill("1")

    # Focus second input
    otp_inputs.nth(1).focus()

    # Press Backspace
    otp_inputs.nth(1).press("Backspace")

    # Verify the first input still contains its value
    expect(otp_inputs.nth(0)).to_have_value("1")

# Test otp input behavior when entering digits and navigating between inputs
def test_otp_keyboard_navigation(page: Page):
    reset_page = ResetPasswordPage(page)

    page.route(
        "**/api/auth/send-reset-otp",
        lambda route: route.fulfill(
            status=200,
            content_type="application/json",
            body='{"success": true, "message": "OTP sent"}'
        )
    )

    reset_page.open()
    reset_page.submit_email("test@example.com")
    reset_page.expect_otp_step()

    otp_inputs = reset_page.otp_inputs

    # Type first digit
    otp_inputs.nth(0).fill("1")

    # First input should contain 1
    expect(otp_inputs.nth(0)).to_have_value("1")

    # Focus should automatically move to second input
    expect(otp_inputs.nth(1)).to_be_focused()

    # Type second digit
    otp_inputs.nth(1).fill("2")

    expect(otp_inputs.nth(1)).to_have_value("2")
    expect(otp_inputs.nth(2)).to_be_focused()