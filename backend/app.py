# app.py

from flask import Flask
from flask_cors import CORS

from routes.user_routes import user_bp
from routes.task_routes import task_bp
from routes.auth_routes import auth_bp
from routes.email_routes import test_bp

app = Flask(__name__)

CORS(app, origins=[
     "http://localhost:3000",
     "https://task-manager-silk-ten.vercel.app"
])

app.register_blueprint(user_bp)
app.register_blueprint(task_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(test_bp)

@app.route("/")
def home():
    return {
        "message": "Task Manager API Running"
    }

if __name__ == "__main__":
    app.run(debug=True)