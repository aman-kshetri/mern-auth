from playwright.sync_api import Page
from pages.login_page import LoginPage
from pages.home_page import HomePage
from pages.navbar import Navbar

# Test login using Page Object Model (POM) pattern
def test_login_with_pom(page: Page, registered_user):
    login_page = LoginPage(page)
    home_page = HomePage(page)

    # Open login page
    login_page.open()

    # Switch to login mode
    login_page.switch_to_login()

    # Login
    login_page.login(
        registered_user["email"],
        registered_user["password"]
    )

    # Verify login
    home_page.expect_user_logged_in(
        registered_user["name"]
    )

# Test logout using Page Object Model (POM) pattern
def test_logout_with_pom(page: Page, registered_user):
    home_page = HomePage(page)
    navbar = Navbar(page)

    # Fixture already registered and logged in the user
    home_page.expect_user_logged_in(
        registered_user["name"]
    )

    # Logout
    navbar.logout()

    # Verify logged out
    navbar.expect_logged_out()