"use client";

import AssignedTasks from "@/components/AssignedTask";
import CreatedTasks from "@/components/CreatedTask";
import CreateTaskForm from "@/components/CreateTaskForm";
import LoginButton from "@/components/LoginButton";
import UserProfile from "@/components/UserProfile";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = useCurrentUser();
  console.log(currentUser);

  return (
    <main className="p-8">
      <div className="flex items-center justify-between ">
        <h1 className="text-3xl font-bold mb-4">
          Task Manager
        </h1>
        <UserProfile />
      </div>
      
      <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          +
        </button>

      {isOpen && (
        <CreateTaskForm
          onClose={() => setIsOpen(false)}
        />
      )}

      <AssignedTasks />

      <CreatedTasks />
    </main>
  );
}