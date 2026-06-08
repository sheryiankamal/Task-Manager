"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { Task } from "@/types/taskByMe";
import { useCurrentUser } from "@/hooks/useCurrentUser";



export default function CreatedTasks() {

  const currentUser = useCurrentUser();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!currentUser?.id) return;
    try{
      api.get(`/users/${currentUser?.id}/created-tasks`).then((res) => {
      setTasks(res.data.tasks);
    });
    }catch(error){
      console.error("Error fetching created tasks:", error);
    }
  }, [currentUser]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Assigned By Me</h2>
       
      {tasks.map((task) => (
        <div key={task.id} className="border rounded p-4 mb-3">
          <h3 className="font-semibold">{task.title}</h3>

          <p>{task.description}</p>

          <p>Status: {task.status}</p>

          <p>Assigned To: {task.assignedUser?.name}</p>
        </div>
      ))}
    </div>
  );
}
