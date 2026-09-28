from playwright.sync_api import Page, expect


def test_login_with_fixture(page: Page, registered_user):
    # Go to login page
    page.goto("http://localhost:5173/login")

    # Switch from Sign Up to Login
    page.get_by_text("Login here", exact=True).click()

    # Login using fixture-created account
    page.get_by_placeholder("Email id").fill(
        registered_user["email"]
    )
    page.get_by_placeholder("Password").fill(
        registered_user["password"]
    )

    page.get_by_role("button", name="Login").click()

    # Verify successful login
    expect(page).to_have_url("http://localhost:5173/")
    expect(
        page.get_by_text(f"Hey {registered_user['name']}!")
    ).to_be_visible()