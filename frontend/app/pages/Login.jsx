"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter(); // Use Next.js router
  
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      });

      const data = await response.json();
      
      if (!response.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }

      setMessage("Login successful!");
      if(data.role == "admin"){ router.push(`/login/admin`);}
      else  router.push(`/tasks/${data.id}`);
      
    } catch (error) {
      setMessage("Server error. Please try again.");
      console.error("Fetch error:", error);
    }
  };

  return (
    <div
      className="flex items-center justify-center font-sans"
      style={{
        backgroundImage: "url('/neture.png')",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="w-[500px] h-[500px] bg-blue-100 rounded-md flex flex-col items-center"
      >
        <h1 className="font-bold text-4xl mt-4">Login Form</h1>
        <h1 className="font-bold text-2xl mt-10">Username</h1>
        <input
          value={username}
          type="text"
          placeholder="Enter name"
          className="text-center w-[70%] h-[9%] rounded-md mt-5"
          onChange={(e) => setUsername(e.target.value)}
        />
        <h1 className="font-bold text-2xl mt-10">Password</h1>
        <input
          value={password}
          type="password"
          placeholder="Enter password"
          className="text-center w-[70%] h-[9%] rounded-md mt-5"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="mt-[10%] p-3 bg-black text-white rounded-md text-xl"
        >
          Submit
        </button>
        <h1 className="mt-4 text-red-700 text-xl font-bold">{message}</h1>
      </form>
    </div>
  );
}
