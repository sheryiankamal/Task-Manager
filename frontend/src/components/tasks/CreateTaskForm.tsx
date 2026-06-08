"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import { User } from "@/types/user";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { createTask } from "@/services/taskService";

interface CreateTaskFormProps {
  onClose: () => void;
  onTaskCreated: () => void;
}


export default function CreateTaskForm({ onClose, onTaskCreated }: CreateTaskFormProps) {

  const currentUser = useCurrentUser();

  const [users, setUsers] = useState<User[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if(!currentUser?.id) return;
    try{
      api.get("/users").then((res) => {
      console.log("Users API Response:", res.data);
      setUsers(res.data.users);
    });
    }catch(error){
      console.error("Error fetching users:", error);
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      title,
      description,
      created_by: currentUser?.id,
      assigned_to: assignedTo,
    });

    try {
      await createTask({
        title,
        description,
        created_by: currentUser?.id,
        assigned_to: assignedTo,
      });

      onTaskCreated();
      alert("Task Created");

    setTitle("");
    setDescription("");
    setAssignedTo("");
      onClose();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Error creating task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-8 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          Create Task
        </h2>

        <button
          onClick={onClose}
          className="text-white"
        >
          ✕
        </button>
            </div>
      <input
        className="border p-2 w-full mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="
            w-full
            rounded-lg
            border
            border-gray-300
            bg-gray-950
                        px-3
            py-2
            text-sm
            shadow-sm
            focus:border-blue-500
            focus:outline-none
            focus:ring-2
            focus:ring-blue-200
            mb-4
        "
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">Select User</option>

        {users
          .filter((user) => user.id !== currentUser?.id)
          .map((user: User) => (
            <option key={user.id} value={user.id} className="bg-gray-900">
              {user.name}
            </option>
          ))}
      </select>

      <button type="submit" className="border px-4 py-2">
        Create
      </button>
    </form>
  );
}
