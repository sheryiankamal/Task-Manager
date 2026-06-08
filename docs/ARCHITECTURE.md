# Local

┌─────────────────────────┐
│        User             │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│     Next.js Frontend    │
│                         │
│  • Dashboard            │
│  • Create Task Modal    │
│  • Assigned Tasks       │
│  • Created Tasks        │
│  • Status Updates       │
│  • NextAuth             │
└───────────┬─────────────┘
            │
            │ REST API
            ▼
┌─────────────────────────┐
│      Flask Backend      │
│                         │
│  • User APIs            │
│  • Task APIs            │
│  • Auth APIs            │
│  • Email Service        │
│  • Error Handling       │
└───────┬─────────┬───────┘
        │         │
        │         │
        ▼         ▼

┌─────────────────┐    ┌─────────────────┐
│    Supabase     │    │     Resend      │
│                 │    │                 │
│ PostgreSQL DB   │    │ Email Service   │
│                 │    │                 │
│ Users           │    │ Task Assigned   │
│ Tasks           │    │ Task Completed  │
└─────────────────┘    └─────────────────┘

        ▲
        │
        │
┌─────────────────┐
│  Google OAuth   │
│                 │
│ Authentication  │
└─────────────────┘

# Deployement

┌─────────────┐
│    User     │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│ Vercel (Frontend)    │
│                      │
│ Next.js + NextAuth   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Render (backend)              │
│                      │
│ Flask REST API       │
└───────┬───────┬──────┘
        │       │
        ▼       ▼

┌─────────────┐  ┌─────────────┐
│  Supabase   │  │   Resend    │
│ PostgreSQL  │  │ Email API   │
└─────────────┘  └─────────────┘

        ▲
        │
        ▼

┌─────────────┐
│ Google OAuth│
└─────────────┘