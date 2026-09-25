import pytest

@pytest.fixture
def base_url():
    return {
        "http://localhost:4000"
    }

@pytest.fixture
def test_user():
    return{
        "name": "Test Bahadur",
        "email": "test@example.com",
        "password": "Password123"
    }