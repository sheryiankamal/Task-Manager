"use client";

import { useSession, signOut } from "next-auth/react";
import LoginButton from "../auth/LoginButton";

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) return <LoginButton />;

  return (
    <div className="flex items-center gap-3">

      <img
        src={session.user?.image ?? ""}
        alt={session.user?.name ?? "User"}
        className="
            w-12
            h-12
            rounded-full
            border-2
            border-blue-500
            "
        />

      <div>
        <p className="text-sm font-medium">
          {session.user?.name}
        </p>

        <p className="text-xs text-gray-400">
          {session.user?.email}
        </p>
      </div>

      <button
        onClick={() => signOut()}
        className="border px-3 py-1 rounded"
      >
        Logout
      </button>

    </div>
  );
}