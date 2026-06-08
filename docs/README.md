# Task Manager

A full-stack task management application that allows users to authenticate with Google, assign tasks to other users, track task progress, and receive email notifications for task updates.

---

## Features

### Authentication

* Google OAuth Login using NextAuth
* Secure user session management
* Automatic user registration in database

### Task Management

* Create tasks
* Assign tasks to other users
* View tasks assigned to you
* View tasks created by you
* Update task status

### Task Status Workflow

* Pending
* In Progress
* Completed

### Email Notifications

* Email sent when a task is assigned
* Email sent when a task is marked as completed
* Email notifications are implemented using Resend.
* Due to Resend's testing restrictions on unverified domains, emails are currently delivered to the verified testing email address. Once a custom domain is verified,
  notifications can be sent to any recipient.

### User Experience

* Modal-based task creation
* Responsive dashboard
* Status badges and status updates
* User-specific task filtering

---

## Tech Stack

### Frontend

* Next.js
* TypeScript
* Tailwind CSS
* NextAuth

### Backend

* Flask
* Python

### Database

* Supabase PostgreSQL

### Authentication

* Google OAuth

### Notifications

* Gmail SMTP

---

## Project Structure

### Frontend

```text
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
├── public/
└── package.json
```

### Backend

```text
backend/
├── routes/
├── services/
├── app.py
├── requirements.txt
└── .env
```

---

## Database Schema

### Users

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| name       | Text      |
| email      | Text      |
| google_id  | Text      |
| created_at | Timestamp |

### Tasks

| Column      | Type      |
| ----------- | --------- |
| id          | UUID      |
| title       | Text      |
| description | Text      |
| status      | Text      |
| created_by  | UUID      |
| assigned_to | UUID      |
| created_at  | Timestamp |

---

## API Endpoints

### Authentication

#### Create / Fetch Google User

```http
POST /auth/google
```

---

### Users

#### Get All Users

```http
GET /users
```

---

### Tasks

#### Create Task

```http
POST /tasks
```

Request:

```json
{
  "title": "Build Login API",
  "description": "Implement Google OAuth",
  "created_by": "user_uuid",
  "assigned_to": "user_uuid"
}
```

---

#### Get Assigned Tasks

```http
GET /users/{user_id}/assigned-tasks
```

---

#### Get Created Tasks

```http
GET /users/{user_id}/created-tasks
```

---

#### Update Task Status

```http
PUT /tasks/{task_id}/status
```

Request:

```json
{
  "status": "completed"
}
```

---

## Environment Variables

### Frontend (.env.local)

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

---

### Backend (.env)

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

EMAIL_ADDRESS=your_email@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

---

### Backend Setup

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Backend runs on:

```text
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## Email Notification Flow

### Task Assignment

```text
Create Task
    ↓
Assign User
    ↓
Email Sent To Assignee
```

### Task Completion

```text
Update Status → Completed
            ↓
Email Sent To Task Creator
```

---

## Authentication Flow

```text
User Login
    ↓
Google OAuth
    ↓
NextAuth Session
    ↓
Backend User Sync
    ↓
Database User Record
```

## Live Demo

Frontend:
https://task-manager-silk-ten.vercel.app

Backend:
https://task-manager-8z1x.onrender.com/

## Tech Stack

- Next.js
- TypeScript
- Flask
- Supabase
- NextAuth
- Google OAuth
- Resend

---

## Future Improvements

* Task due dates
* Task priority levels
* Search and filtering
* Team management
* Real-time notifications
* File attachments
* Dashboard analytics

---

## Author

Kamal Bansal

Software Engineer | Full Stack Developer

---

## License

This project is created for learning and assessment purposes.
