from services.email_service import send_email
from flask import Blueprint 

test_bp = Blueprint("test", __name__)

@test_bp.route("/test-email")
def test_email():

    send_email(
        "bansalkamal2244@gmail.com",
        "Test Email",
        "Task Manager is working"
    )

    return {
        "message": "sent"
    }