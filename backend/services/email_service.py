import os
import resend

resend.api_key = os.getenv("RESEND_API_KEY")


def send_email(to_email, subject, body):

    try:

        response = resend.Emails.send({
            "from": "Task Manager <onboarding@resend.dev>",
            "to": [to_email],
            "subject": subject,
            "text": body
        })

        print("Email sent:", response)

        return True

    except Exception as e:

        print("Email failed:", e)

        return False