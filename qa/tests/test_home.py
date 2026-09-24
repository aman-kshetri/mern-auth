from playwright.sync_api import Page, expect

def test_home_page_loads(page: Page):
    page.goto("http://localhost:5173/")
    expect(page).to_have_url("http://localhost:5173/")