from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

SUPABASE_URL = os.getenv("Project_URL")
SUPABASE_KEY = os.getenv("Anon_Key")

print("Supabase URL:", SUPABASE_URL)
print("Supabase Key:", SUPABASE_KEY)

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)