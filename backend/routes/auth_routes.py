from flask import Blueprint, request
from services.supabase_client import supabase

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/auth/google", methods=["POST"])
def google_login():

    data = request.get_json()

    email = data["email"]
    name = data["name"]

    existing_user = (
        supabase
        .table("users")
        .select("*")
        .eq("email", email)
        .execute()
    )

    if existing_user.data:
        return {
            "user": existing_user.data[0]
        }

    new_user = (
        supabase
        .table("users")
        .insert({
            "name": name,
            "email": email
        })
        .execute()
    )

    return {
        "user": new_user.data[0]
    }