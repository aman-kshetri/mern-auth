# Test successful login
def test_login_success(api_client, test_user):
    # Registering
    register_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    assert register_response.status_code == 200
    assert register_response.json()["success"] is True

    # Login
    response = api_client.post(
        "/api/auth/login",
        {
            "email": test_user["email"],
            "password": test_user["password"]

        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is True
    assert data ["message"] == "Login successful"

# Test login wrong password
def test_login_wrong_password(api_client, test_user):
    #Register user
    register_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    assert register_response.json()["success"] is True

    # Login with wrong password
    response = api_client.post(
        "/api/auth/login",
        {
            "email": test_user["email"],
            "password": "Wrongpassword1234"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Invalid credentials"

# Test login with unregistered email
def test_login_unregistered_email(api_client):
    response = api_client.post(
        "/api/auth/login",
        {
            "email": "does_not_exist@example.com",
            "password": "Password123"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Invalid credentials"

# Test login without email
def test_login_missing_email(api_client):
    response = api_client.post(
        "/api/auth/login",
        {
            "password": "Password123"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Email and password are required"

# Test login without password
def test_login_missing_password(api_client):
    response = api_client.post(
        "/api/auth/login",
        {
            "email": "test@example.com"
        }
    )

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Email and password are required"

