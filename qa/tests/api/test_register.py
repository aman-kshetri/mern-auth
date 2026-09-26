import pytest

# Test register missing required fields
@pytest.mark.parametrize(
    "payload",
    [
        {
            "email": "test@example.com",
            "password": "Password123"
        },
        {
            "name": "Test User",
            "password": "Password123"
        },
        {
            "name": "Test User",
            "email": "test@example.com"
        }
    ]
)
def test_register_missing_required_field(api_client, payload):
    response = api_client.post(
        "/api/auth/register",
        payload
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

# Test registration with existing or duplicate email
def test_register_duplicate_email(api_client, test_user):
    # First registration
    first_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    assert first_response.json()["success"] is True

    # Second registration with same email
    second_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    data = second_response.json()

    assert second_response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "User already exists"

# Test registration with empty values for required fields
@pytest.mark.parametrize(
    "payload",
    [
        {
            "name": "",
            "email": "test@example.com",
            "password": "Password123"
        },
        {
            "name": "Test User",
            "email": "",
            "password": "Password123"
        },
        {
            "name": "Test User",
            "email": "test@example.com",
            "password": ""
        }
    ]
)
def test_register_empty_required_fields(api_client, payload):
    response = api_client.post(
        "/api/auth/register",
        payload
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Missing details"

# Test registration with invalid email formats
@pytest.mark.parametrize(
    "email",
    [
        "test",
        "test@",
        "@gmail.com",
        "test@gmail",
        "test..test@gmail.com"
    ]
)
def test_register_invalid_email_format(api_client, email):
    response = api_client.post(
        "/api/auth/register",
        {
            "name": "Test User",
            "email": email,
            "password": "Password123"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False

# Test for short password during registration
def test_register_short_password(api_client):
    response = api_client.post(
        "/api/auth/register",
        {
            "name": "Test User",
            "email": "shortpass@example.com",
            "password": "123"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False

# Test for unexpected extra fields during registration
def test_register_with_extra_field(api_client):
    payload = {
        "name": "Test User",
        "email": "extra@example.com",
        "password": "Password123",
        "unexpectedField": "some value"
    }

    response = api_client.post(
        "/api/auth/register",
        payload
    )

    assert response.status_code == 200
    assert response.json()["success"] is True