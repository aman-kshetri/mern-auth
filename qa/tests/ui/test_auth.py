from playwright.sync_api import Page, expect
import uuid


def test_valid_login(page: Page):
    
    # Create a unique user
    unique_email = f"login_{uuid.uuid4().hex[:8]}@example.com"
    password = "Password123"

    # Goto and register
    page.goto("http://localhost:5173/login")
    page.get_by_placeholder("Full name").fill("Login Test User")
    page.get_by_placeholder("Email id").fill(unique_email)
    page.get_by_placeholder("Password").fill(password)
    page.get_by_role("button", name="Sign Up").click()

    # Confirm registration success
    expect(page).to_have_url("http://localhost:5173/")
    expect(page.get_by_text("Hey Login Test User!")).to_be_visible()

    # Go back to login page, shows sign up > so, switch to login page and login
    page.goto("http://localhost:5173/login")
    page.get_by_text("Login here", exact=True).click()

    page.get_by_placeholder("Email id").fill(unique_email)
    page.get_by_placeholder("Password").fill(password)
    page.get_by_role("button", name="Login").click()

    # Verify successful login
    expect(page).to_have_url("http://localhost:5173/")
    expect(page.get_by_text("Hey Login Test User!")).to_be_visible()

# Test invalid login
def test_invalid_login(page: Page):
    page.goto("http://localhost:5173/login")

    # Switch to Login mode
    page.get_by_text("Login here", exact=True).click()

    # Enter invalid credentials
    page.get_by_placeholder("Email id").fill(
        "doesnotexist@example.com"
    )
    page.get_by_placeholder("Password").fill("WrongPassword123")
    page.get_by_role("button", name="Login").click()

    # Verify error toast
    expect(page.get_by_text("Invalid credentials")).to_be_visible()

# Test logout
def test_logout(page: Page):
    unique_email = f"logout_{uuid.uuid4().hex[:8]}@example.com"
    password = "Password123"

    # Register user
    page.goto("http://localhost:5173/login")

    page.get_by_placeholder("Full name").fill("Logout Test User")
    page.get_by_placeholder("Email id").fill(unique_email)
    page.get_by_placeholder("Password").fill(password)
    page.get_by_role("button", name="Sign Up").click()

    # Verify user is logged in
    expect(page).to_have_url("http://localhost:5173/")
    expect(page.get_by_text("Hey Logout Test User!")).to_be_visible()

    # Locate the avatar
    avatar = page.locator("div.group")

    # Hover over the avatar to reveal the dropdown
    avatar.hover()

    # Verify Logout is visible
    expect(page.get_by_text("Logout", exact=True)).to_be_visible()

    # Click Logout
    page.get_by_text("Logout", exact=True).click()

    # Verify user is logged out
    expect(page.get_by_role("button", name="Login")).to_be_visible()

def test_logout(page: Page, registered_user):
    # User is already registered and logged in by the fixture
    expect(page).to_have_url("http://localhost:5173/")
    expect(
        page.get_by_text(f"Hey {registered_user['name']}!")
    ).to_be_visible()

    # Locate the avatar
    avatar = page.locator("div.group")

    # Hover to reveal the menu
    avatar.hover()

    # Verify Logout is visible
    expect(page.get_by_text("Logout", exact=True)).to_be_visible()

    # Click Logout
    page.get_by_text("Logout", exact=True).click()

    # Verify logged-out state
    expect(
        page.get_by_role("button", name="Login")
    ).to_be_visible()