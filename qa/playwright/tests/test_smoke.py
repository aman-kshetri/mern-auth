from playwright.sync_api import Page, expect

def test_homepage_loads(page: Page):
    # Navigate to the homepage
    page.goto("http://localhost:5173")

    # Assert that the page has loaded by checking the URL and the presence of a specific element
    expect(page).to_have_url("https://localhost:5173/")
    expect(page.get_by_text("Welcome to our app")).to_be_visible()
