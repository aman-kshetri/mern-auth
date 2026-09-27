from playwright.sync_api import Page, expect

# Test if login page loads correctly
def test_login_page_loads(page: Page):
    page.goto("http://localhost:5173/login")

    expect(page).to_have_url("http://localhost:5173/login")

    expect(
        page.get_by_role("heading", name="Create account")
    ).to_be_visible()

    expect(
        page.get_by_text("Create your account")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Full name")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Email id")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Password")
    ).to_be_visible()

    expect(
        page.get_by_role("button", name="Sign Up")
    ).to_be_visible()

# Switch from Sign Up to Login
def test_switch_to_login(page: Page):
    page.goto("http://localhost:5173/login")

    page.get_by_text("Login here", exact=True).click()

    expect(
        page.get_by_role("heading", name="Login")
    ).to_be_visible()

    expect(
        page.get_by_text("Login to your account!")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Email id")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Password")
    ).to_be_visible()

    expect(
        page.get_by_role("button", name="Login")
    ).to_be_visible()

# Switch Login back to Sign Up
def test_switch_login_back_to_signup(page: Page):
    page.goto("http://localhost:5173/login")

    # Initial state is Sign Up
    page.get_by_text("Login here", exact=True).click()

    # Now Login state
    expect(
        page.get_by_role("heading", name="Login")
    ).to_be_visible()

    # Switch back
    page.get_by_text("Sign Up", exact=True).click()

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
    page.goto("http://localhost:5173/login")

    page.get_by_text("Forgot password?", exact=True).click()

    expect(page).to_have_url(
        "http://localhost:5173/reset-password"
    )

    expect(
        page.get_by_role("heading", name="Reset password")
    ).to_be_visible()

    expect(
        page.get_by_text("Enter your registered email address")
    ).to_be_visible()

    expect(
        page.get_by_placeholder("Email id")
    ).to_be_visible()

    expect(
        page.get_by_role("button", name="Submit")
    ).to_be_visible()