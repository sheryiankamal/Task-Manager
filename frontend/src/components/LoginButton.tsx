"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";

export default function LoginButton() {

  return (
    <button className="border px-3 py-1 rounded"
      onClick={() =>
        signIn("google")
      }
    >
      Login With Google
    </button>
  );
}