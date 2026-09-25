def test_user_data(test_user):

    assert test_user["name"] == "Test Bahadur"
    assert test_user["email"] == "test@example.com"
    assert test_user["password"] == "Password123"


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