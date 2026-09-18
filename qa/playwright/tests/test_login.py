from playwright.sync_api import Page, expect

def test_login_page_loads(page: Page):
    # Navigate to login page
    page.goto("http://localhost:5173/login")

    # Assert that the login page has loaded by checking the URL and the presence of specific elements
    expect(page.get_by_text("Create account")).to_be_visible()
    expect(page.get_by_placeholder("Email id")).to_be_visible()
    expect(page.get_by_placeholder("Password")).to_be_visible()
    expect(page.get_by_role("button", name="Sign Up")).to_be_visible()


# UI state tests
def test_login_form_does_not_show_name(page: Page):
    page.goto("http://localhost:5173/login")

    page.get_by_text("Login here").click()

    expect(page.get_by_placeholder("Full name")).not_to_be_visible()

def test_switch_login_to_signup(page: Page):
    page.goto("http://localhost:5173/login")

    page.get_by_text("Login here").click()

    page.get_by_text("Sign Up").last.click()

    expect(page.get_by_text("Create account")).to_be_visible()
    expect(page.get_by_placeholder("Full name")).to_be_visible()

# Test invalid login
def test_invalid_login(page: Page):
    page.goto("http://localhost:5173/login")

    page.get_by_text("Login here").click()

    page.get_by_placeholder("Email id").fill("invalid@example.com")
    page.get_by_placeholder("Password").fill("WrongPassword123")

    page.get_by_role("button", name="Login").click()

    expect(page.get_by_text("Invalid credentials")).to_be_visible()

# Test valid login
def test_successful_login(page: Page):
    page.goto("http://localhost:5173/login")

    page.get_by_text("Login here").click()

    page.get_by_placeholder("Email id").fill("aman1@gmail.com")
    page.get_by_placeholder("Password").fill("Aman1234")

    page.get_by_role("button", name="Login").click()

    expect(page).to_have_url("http://localhost:5173/")

    expect(page.get_by_text("Welcome to our app")).to_be_visible()