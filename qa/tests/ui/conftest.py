import pytest
import uuid
from playwright.sync_api import Page, expect


@pytest.fixture
def registered_user(page: Page):
    user = {
        "name": "Fixture Test User",
        "email": f"fixture_{uuid.uuid4().hex[:8]}@example.com",
        "password": "Password123",
    }

    page.goto("http://localhost:5173/login")

    page.get_by_placeholder("Full name").fill(user["name"])
    page.get_by_placeholder("Email id").fill(user["email"])
    page.get_by_placeholder("Password").fill(user["password"])

    page.get_by_role("button", name="Sign Up").click()

    expect(page).to_have_url("http://localhost:5173/")
    expect(
        page.get_by_text(f"Hey {user['name']}!")
    ).to_be_visible()

    return user