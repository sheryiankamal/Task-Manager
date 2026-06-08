from services.email_service import send_email
from flask import Blueprint 

test_bp = Blueprint("test", __name__)

@test_bp.route("/test-email")
def test_email():

    try:

        success = send_email(
            "kamal.bansal021202@gmail.com",
            "Test Email",
            "Task Manager is working"
        )

        if success:
            return {
                "message": "Email sent successfully"
            }, 200

        return {
            "message": "Email failed"
        }, 500

    except Exception as e:

        print(f"Test Email Error: {e}")

        return {
            "error": str(e)
        }, 500