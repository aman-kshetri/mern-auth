import requests

BASE_URL = "http://localhost:4000"

# Missing name during registration
def test_register_missing_name(api_client, test_user):
    response = api_client.post(
        "/api/auth/register",
        {
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"

# Missing email during registration
def test_register_missing_email(api_client, test_user):
    response = api_client.post(
        "/api/auth/register",
        {
            "name": test_user["name"],
            "password": test_user["password"]
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"

# Missing password during registration
def test_register_missing_password(api_client, test_user):
    response = api_client.post(
        "/api/auth/register",
        {
            "name": test_user["name"],
            "email": test_user["email"]
        }
    )
    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"

# Successful Registration
def test_register_success(api_client, test_user):
    response = api_client.post(
        "/api/auth/register",
        test_user
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is True
    assert data["message"] == "Registration successful"