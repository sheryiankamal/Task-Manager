"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Task } from "@/types/taskForMe";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function AssignedTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const currentUser = useCurrentUser();

  const updateStatus = async (taskId: string, status: string) => {
    try {
      await api.put(`/tasks/${taskId}/status`, {
        status,
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }

    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status } : task)),
    );
  };

  useEffect(() => {
     if (!currentUser?.id) return;
     try{
      api.get(`/users/${currentUser.id}/assigned-tasks`).then((res) => {
        setTasks(res.data.tasks);
      });
     }
     catch(error){
      console.error("Error fetching assigned tasks:", error);
     }
  }, [currentUser]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 mt-4">Assigned To Me</h2>

      {tasks.map((task: Task) => (
        <div key={task.id} className="border rounded p-4 mb-3">
          <h3 className="font-semibold">{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <p>Created By: {task.creator?.name}</p>

          <div className="mb-2">
            Status:
            <span
              className={`
                ml-2
                px-2
                py-1
                rounded
                text-sm
                ${
                  task.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                }
              `}
            >
              {task.status}
            </span>
          </div>

          <select
            value={task.status}
            onChange={(e) => updateStatus(task.id, e.target.value)}
            className="
            border
            rounded-md
            px-2
            py-1
            text-white
            bg-gray-950"
          >
            <option value="pending">Pending</option>

            <option value="in_progress">In Progress</option>

            <option value="completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
