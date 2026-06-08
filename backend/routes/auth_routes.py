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

        # First check by email
        existing_user = (
            supabase
            .table("users")
            .select("*")
            .eq("email", email)
            .execute()
        )

        if existing_user.data:

            user = existing_user.data[0]

            # Update google_id if missing or changed
            if user.get("google_id") != google_id:

                (
                    supabase
                    .table("users")
                    .update({
                        "google_id": google_id
                    })
                    .eq("id", user["id"])
                    .execute()
                )

                user["google_id"] = google_id

            return {
                "user": user
            }, 200

        # Create new user if email doesn't exist
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