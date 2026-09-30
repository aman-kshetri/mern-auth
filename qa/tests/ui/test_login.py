from playwright.sync_api import Page, expect
from pages.login_page import LoginPage

# Test if login page loads correctly
def test_login_page_loads(page: Page):
    login_page = LoginPage(page)

    login_page.open()
    login_page.expect_signup_form_visible()

# Switch from Sign Up to Login
def test_switch_to_login(page: Page):
    login_page = LoginPage(page)

    login_page.open()
    login_page.switch_to_login()
    login_page.expect_login_form_visible()

# Switch Login back to Sign Up
def test_switch_login_back_to_signup(page: Page):
    login_page = LoginPage(page)

    login_page.open()

    login_page.switch_to_login()

    expect(
        page.get_by_role("heading", name="Login")
    ).to_be_visible()

    login_page.switch_to_signup()

    expect(
        page.get_by_role("heading", name="Create account")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Full name")
    ).to_be_visible()

    expect(
        page.get_by_role("button", name="Sign Up")
    ).to_be_visible()

# Forgot password navigation
def test_forgot_password_navigation(page: Page):
    login_page = LoginPage(page)

    login_page.open()
    login_page.click_forgot_password()

    expect(
        page
    ).to_have_url("http://localhost:5173/reset-password")

    expect(
        page.get_by_role("heading", name="Reset password")
    ).to_be_visible()

    expect(
        page.get_by_text(
            "Enter your registered email address"
        )
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Email id")
    ).to_be_visible()

    expect(
        page.get_by_role("button", name="Submit")
    ).to_be_visible()