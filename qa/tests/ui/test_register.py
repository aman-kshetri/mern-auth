from playwright.sync_api import Page, expect
import uuid

# Test user registration
def test_user_registration(page: Page):
    unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"

    # Open signup page
    page.goto("http://localhost:5173/login")

    # Fill registration form
    page.get_by_placeholder("Full name").fill("Test User")
    page.get_by_placeholder("Email id").fill(unique_email)
    page.get_by_placeholder("Password").fill("Password123")

    # Submit registration
    page.get_by_role("button", name="Sign Up").click()

    # Successful registration redirects to home
    expect(page).to_have_url("http://localhost:5173/")

    # Verify logged-in user is displayed
    expect(page.get_by_text("Hey Test User!")).to_be_visible()