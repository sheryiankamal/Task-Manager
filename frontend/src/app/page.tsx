"use client";

import AssignedTasks from "@/components/tasks/AssignedTask";
import CreatedTasks from "@/components/tasks/CreatedTask";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import UserProfile from "@/components/auth/UserProfile";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useState } from "react";

export default function Home() {
   const [showModal, setShowModal] =
    useState(false);

  const [refreshKey, setRefreshKey] =
    useState(0);

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
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          +
        </button>

      {showModal && (
        <CreateTaskForm
          onClose={() => setShowModal(false)}
          onTaskCreated={() => setRefreshKey((prev) => prev + 1)}
        />
      )}

      <AssignedTasks />

      <CreatedTasks refreshKey={refreshKey} />
    </main>
  );
}