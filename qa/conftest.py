import pytest
import uuid
from utils.api_client import APIClient


@pytest.fixture(scope="session")
def base_url():
    return "http://localhost:4000"


@pytest.fixture
def api_client(base_url):
    return APIClient(base_url)


@pytest.fixture
def test_user():
    unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"

    return {
        "name": "Test User",
        "email": unique_email,
        "password": "Password123"
    }