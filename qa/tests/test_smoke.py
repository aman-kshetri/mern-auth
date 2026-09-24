import requests

def test_backend_is_running():
    response = requests.get("http://localhost:4000")
    assert response.status_code == 200
    assert response.text == "API Working"