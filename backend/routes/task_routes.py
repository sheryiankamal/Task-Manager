from flask import Blueprint, request
from services.supabase_client import supabase
from services.email_service import send_email

task_bp = Blueprint("tasks", __name__)


@task_bp.route("/tasks", methods=["POST"])
def create_task():

    try:

        data = request.get_json()

        required_fields = [
            "title",
            "description",
            "created_by",
            "assigned_to"
        ]

        for field in required_fields:
            if field not in data:
                return {
                    "error": f"{field} is required"
                }, 400

        response = (
            supabase
            .table("tasks")
            .insert({
                "title": data["title"],
                "description": data["description"],
                "created_by": data["created_by"],
                "assigned_to": data["assigned_to"],
                "status": "pending"
            })
            .execute()
        )

        try:
            assigned_user = (
                supabase
                .table("users")
                .select("name,email")
                .eq("id", data["assigned_to"])
                .single()
                .execute()
            )

            send_email(
                assigned_user.data["email"],
                "New Task Assigned",
                f"Task: {data['title']}"
            )

        except Exception as email_error:
            print(f"Email Error: {email_error}")

        return {
            "message": "Task created",
            "task": response.data
        }, 201

    except Exception as e:

        print(f"Create Task Error: {e}")

        return {
            "error": str(e)
        }, 500

@task_bp.route("/users/<user_id>/assigned-tasks")
def assigned_tasks(user_id):

    try:

        tasks = (
            supabase
            .table("tasks")
            .select("*")
            .eq("assigned_to", user_id)
            .execute()
        ).data

        for task in tasks:

            creator = (
                supabase
                .table("users")
                .select("name,email")
                .eq("id", task["created_by"])
                .single()
                .execute()
            )

            task["creator"] = creator.data

        return {
            "tasks": tasks
        }, 200

    except Exception as e:

        print(f"Assigned Tasks Error: {e}")

        return {
            "error": str(e)
        }, 500
        
@task_bp.route("/users/<user_id>/created-tasks")
def created_tasks(user_id):

    try:

        tasks = (
            supabase
            .table("tasks")
            .select("*")
            .eq("created_by", user_id)
            .execute()
        ).data

        for task in tasks:

            assignee = (
                supabase
                .table("users")
                .select("name,email")
                .eq("id", task["assigned_to"])
                .single()
                .execute()
            )

            task["assignedUser"] = assignee.data

        return {
            "tasks": tasks
        }, 200

    except Exception as e:

        print(f"Created Tasks Error: {e}")

        return {
            "error": str(e)
        }, 500


@task_bp.route("/tasks/<task_id>/status", methods=["PUT"])
def update_status(task_id):

    try:

        data = request.get_json()

        response = (
            supabase
            .table("tasks")
            .update({
                "status": data["status"]
            })
            .eq("id", task_id)
            .execute()
        )

        if data["status"] == "completed":

            try:

                task = (
                    supabase
                    .table("tasks")
                    .select("*")
                    .eq("id", task_id)
                    .single()
                    .execute()
                )

                creator = (
                    supabase
                    .table("users")
                    .select("name,email")
                    .eq("id", task.data["created_by"])
                    .single()
                    .execute()
                )

                send_email(
                    creator.data["email"],
                    "Task Completed",
                    f"Task '{task.data['title']}' completed"
                )

            except Exception as email_error:
                print(f"Completion Email Error: {email_error}")

        return {
            "message": "Task updated",
            "task": response.data
        }, 200

    except Exception as e:

        print(f"Update Status Error: {e}")

        return {
            "error": str(e)
        }, 500