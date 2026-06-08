from flask import Blueprint
from services.supabase_client import supabase

user_bp = Blueprint("users", __name__)

@user_bp.route("/users")
def get_users():

    try:

        response = (
            supabase
            .table("users")
            .select("*")
            .execute()
        )

        return {
            "users": response.data
        }, 200

    except Exception as e:

        print(f"Get Users Error: {e}")

        return {
            "error": str(e)
        }, 500