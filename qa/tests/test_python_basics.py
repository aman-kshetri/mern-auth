def test_user_data():
    user = {
        "name": "Test User",
        "email": "test@example.com",
        "password": "Password123"
    }

    assert user["name"] == "Test User"
    assert user["email"] == "test@example.com"
    assert user["password"] == "Password123"


def test_invalid_email_list():
    invalid_emails = [
        "test",
        "test@",
        "@gmail.com",
        ""
    ]

    assert len(invalid_emails) == 4


def test_password_length():
    password = "Password123"

    assert len(password) >= 8