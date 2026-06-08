from flask import Blueprint, request
from services.supabase_client import supabase

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/google", methods=["POST"])
def google_auth():

    try:

        data = request.get_json()

        email = data.get("email")
        name = data.get("name")
        google_id = data.get("google_id")

        existing_user = (
            supabase
            .table("users")
            .select("*")
            .eq("google_id", google_id)
            .execute()
        )

        if existing_user.data:

            return {
                "user": existing_user.data[0]
            }, 200

        new_user = (
            supabase
            .table("users")
            .insert({
                "name": name,
                "email": email,
                "google_id": google_id
            })
            .execute()
        )

        return {
            "user": new_user.data[0]
        }, 201

    except Exception as e:

        print(f"Google Auth Error: {e}")

        return {
            "error": str(e)
        }, 500