"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskPage() {
  const params = useParams();
  const userId = params.id;
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tasks/${userId}`);
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Server did not return JSON");
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch tasks");
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTasks();
  }, [userId]);

  const markAsCompleted = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to update task");

      // Update the tasks state locally
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, status: "completed" } : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <h1 className="text-red-500">{error}</h1>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks for User {userId}</h1>
      {tasks.length > 0 ? (
        <ul className="list-disc pl-6">
          {tasks.map((task) => (
            <li key={task.id} className="text-lg">
              {task.title} - {task.status === "completed" ? "✅ Completed" : "🕒 Pending"}
              {task.status !== "completed" && (
                <button
                  className="bg-green-700 text-white rounded-md p-2 ml-3"
                  onClick={() => markAsCompleted(task.id)}
                >
                  Done
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
}