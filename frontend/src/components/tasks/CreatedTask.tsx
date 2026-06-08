"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/taskByMe";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getCreatedTasks } from "@/services/taskService";

interface CreatedTasksProps {
  refreshKey: number;
}

export default function CreatedTasks({
  refreshKey,
}: CreatedTasksProps) {
  const currentUser = useCurrentUser();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser?.id) return;

      try {
        const res = await getCreatedTasks(currentUser.id);

        setTasks(res.data.tasks);
      } catch (error) {
        console.error(
          "Error fetching created tasks:",
          error
        );
      }
    };

    fetchTasks();
  }, [currentUser, refreshKey]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">
        Assigned By Me
      </h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded p-4 mb-3"
        >
          <h3 className="font-semibold">
            {task.title}
          </h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <p>
            Assigned To:{" "}
            {task.assignedUser?.name}
          </p>
        </div>
      ))}
    </div>
  );
}