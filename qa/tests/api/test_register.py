import requests

BASE_URL = "http://localhost:4000"

# Missing name during registration
def test_register_missing_name(base_url, test_user):
    response = requests.post(
        f"{base_url}/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "Password123"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"

# Missing email during registration
def test_register_missing_email():
    response = requests.post(
        f"{BASE_URL}/api/auth/register",
        json={
            "name": "Test Bahadur",
            "password": "Password123"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"

# Missing password during registration
def test_register_missing_password():
    response = requests.post(
        f"{BASE_URL}/api/auth/register",
        json= {
            "name": "Test Bahadur",
            "email": "test@example.com"
        }
    )
    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"