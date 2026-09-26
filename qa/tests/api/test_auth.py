# Test for authenticated user "/is-auth" endpoint
def test_is_authenticated(api_client, test_user):
    
    # Register
    register_response = api_client.post(
        "/api/auth/register",
        test_user
    )
    assert register_response.json()["success"] is True

    # Login
    login_response = api_client.post(
        "/api/auth/login",
        {
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )
    assert login_response.json()["success"] is True

    # Check authentication
    response = api_client.get("/api/auth/is-auth")

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is True

# Test protected user-data endpoint
def test_get_user_data(api_client, test_user):
    # Register
    register_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    assert register_response.json()["success"] is True

    # Login
    login_response = api_client.post(
        "/api/auth/login",
        {
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )

    assert login_response.json()["success"] is True

    # Access protected endpoint
    response = api_client.get("/api/user/data")

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is True
    assert data["userData"]["name"] == test_user["name"]
    assert data["userData"]["isAccountVerified"] is False

# Test protected API without login
def test_user_data_without_login(api_client):
    response = api_client.get("/api/user/data")

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Not authorized. Login again"

# Test /is-auth without login
def test_is_auth_without_login(api_client):
    response = api_client.get("/api/auth/is-auth")

    data = response.json()

    assert response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Not authorized. Login again"

# Test Logout
def test_logout(api_client, test_user):
    # Register
    register_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    assert register_response.json()["success"] is True

    # Login
    login_response = api_client.post(
        "/api/auth/login",
        {
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )

    assert login_response.json()["success"] is True

    # Verify authentication works
    auth_response = api_client.get(
        "/api/auth/is-auth"
    )

    assert auth_response.json()["success"] is True

    # Logout
    logout_response = api_client.post(
        "/api/auth/logout"
    )

    logout_data = logout_response.json()

    assert logout_response.status_code == 200
    assert logout_data["success"] is True

# Verify logout actually removes authentication
def test_logout_invalidates_session(api_client, test_user):
    # Register
    register_response = api_client.post(
        "/api/auth/register",
        test_user
    )

    assert register_response.json()["success"] is True

    # Login
    login_response = api_client.post(
        "/api/auth/login",
        {
            "email": test_user["email"],
            "password": test_user["password"]
        }
    )

    assert login_response.json()["success"] is True

    # Confirm authenticated
    auth_response = api_client.get(
        "/api/auth/is-auth"
    )

    assert auth_response.json()["success"] is True

    # Logout
    logout_response = api_client.post(
        "/api/auth/logout"
    )

    assert logout_response.json()["success"] is True

    # Try accessing protected endpoint after logout
    protected_response = api_client.get(
        "/api/user/data"
    )

    data = protected_response.json()

    assert protected_response.status_code == 200
    assert data["success"] is False
    assert data["message"] == "Not authorized. Login again"