"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [tasks, settasks] = useState([]);
  const [username, setUsername] = useState("");
  const [task, setTask] = useState("");
  const [id, setId] = useState("");  
  const [tasksid, settasksid] = useState("");  
  const [title, setTitle] = useState("");
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await fetch("http://localhost:3000/login/admin");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchNames();
  }, []);

  const addTask = async () => {
   
    if (!title || !task) {
      alert("Please fill in both the title and task description.");
      return; 
    }
  
    try {
      const response = await fetch("http://localhost:3000/login/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, task, title }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setTitle(""); 
        setTask("");
        alert(data.message); 
        console.log("Task added successfully:", data);
      } else {
        console.error("Failed to add task.");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUserChange = (e) => {
    setId(e.target.value);
  };

  const tasksVisible = async () => {
    if (tasksid) {
      console.log("Fetching tasks for user ID:", tasksid);
      try {
        const response = await fetch("http://localhost:3000/admintasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: tasksid }), 
        });

        if (response.ok) {
          const data = await response.json();
          if (data.message) {
            alert(data.message); 
          } else {
            settasks(data); 
            setShowTasks(true); 
          }
        } else {
          console.error("Failed to fetch tasks", response.statusText);
          alert("Error fetching tasks: " + response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Error fetching tasks: " + error.message);
      }
    } else {
      alert("Please select a user to show tasks.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                <td className="py-2 px-4 border text-center">{user.id}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border text-center font-semibold">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-20 flex items-center">
        <button className="font-bold bg-gray-300 p-2 rounded-md" onClick={addTask}>
          ADD TASK
        </button>

        <input
          value={title}
          onChange={(t) => setTitle(t.target.value)}
          type="text"
          placeholder="Task Title"
          className="bg-gray-200 font-bold ml-4 h-10 border border-black px-2 rounded-md"
        />
        <input
          value={task}
          onChange={(t) => setTask(t.target.value)}
          type="text"
          placeholder="Task Description"
          className="bg-gray-200 font-bold ml-4 h-10 border border-black px-2 rounded-md"
        />

        <select
          name="users"
          className="bg-gray-300 font-bold text-xl ml-5 p-2 rounded-md"
          value={id}
          onChange={handleUserChange}
        >
          <option value="">Select a user to assign task</option>
          {users.map((e) => (
            <option key={e.id} value={e.id} className="text-black font-bold text-xl">
              {e.username}
            </option>
          ))}
        </select>
      </div>

      <h1 className="mt-8">
        <button onClick={tasksVisible} className="bg-black text-white font-bold p-3">
          SHOW TASKS
        </button>

        <select
          name="users"
          className="bg-gray-300 font-bold text-xl ml-5 p-2 rounded-md"
          value={tasksid}
          onChange={(e) => settasksid(e.target.value)}
        >
          <option value="">Select a user to view tasks</option>
          {users.map((e) => (
            <option key={e.id} value={e.id} className="text-black font-bold text-xl">
              {e.username}
            </option>
          ))}
        </select>
      </h1>

      {showTasks && (
        <div className="mt-10">
          <h1 className="font-bold text-xl">{username} tasks</h1>
          <div className="overflow-x-auto mt-5">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">Title</th>
                  <th className="py-2 px-4 border">Description</th>
                  <th className="py-2 px-4 border">Created At</th>
                  <th className="py-2 px-4 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="py-2 px-4 border">{task.title}</td>
                    <td className="py-2 px-4 border">{task.description}</td>
                    <td className="py-2 px-4 border">{new Date(task.created_at).toLocaleString()}</td>
                    <td className="py-2 px-4 border">{task.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
