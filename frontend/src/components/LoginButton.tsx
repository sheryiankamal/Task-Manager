"use client";

import {
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function LoginButton() {

  return (
    <button className="flex
    items-center
    justify-center
    gap-2
    border
    rounded-lg
    px-4
    py-2
    hover:bg-gray-800
    transition"
      onClick={() =>
        signIn("google")
      }
    >
      <FcGoogle size={20} />
      Login With Google
    </button>
  );
}