"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import api from "@/services/api";

export function useCurrentUser() {

  const { data: session } = useSession();

  const [user, setUser] =
    useState<any>(null);

useEffect(() => {
  console.log("Session:", session);

  if (!session?.user) return;

  api
    .post("/auth/google", {
      name: session.user.name,
      email: session.user.email,
    })
    .then((res) => {
      console.log("User from backend:", res.data);

      setUser(res.data.user);
    })
    .catch(console.error);
}, [session]);
  return user;
}