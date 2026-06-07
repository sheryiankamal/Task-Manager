from flask import Blueprint
from services.supabase_client import supabase

user_bp = Blueprint("users", __name__)

@user_bp.route("/users", methods=["GET"])
def get_users():

    response = (
        supabase
        .table("users")
        .select("*")
        .execute()
    )

    return {
        "users": response.data
    }