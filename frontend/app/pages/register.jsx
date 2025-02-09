"use client";
import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage({ text: "Successfully registered!", type: "success" });
      } else {
        setMessage({ text: data.error, type: "error" });
      }
    } catch (error) {
      setMessage({ text: "An error occurred. Please try again.", type: "error" });
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
        onSubmit={handleRegister}
        className="w-[500px] h-[500px] bg-blue-100 rounded-md flex flex-col items-center"
      >
        <h1 className="font-bold text-4xl mt-4">Register Form</h1>
        <h1 className="font-bold text-xl mt-3">Username</h1>
        <input
          value={username}
          type="text"
          placeholder="Enter name"
          className="text-center w-[70%] h-[7%] rounded-md mt-2"
          onChange={(e) => setUsername(e.target.value)}
        />
        <h1 className="font-bold text-xl mt-3">Email</h1>
        <input
          value={email}
          type="email"
          placeholder="Enter email"
          className="text-center w-[70%] h-[7%] rounded-md mt-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <h1 className="font-bold text-xl mt-3">Password</h1>
        <input
          value={password}
          type="password"
          placeholder="Enter password"
          className="text-center w-[70%] h-[7%] rounded-md mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button
          type="submit"
          className="mt-[10%] p-3 bg-black text-white rounded-md text-xl"
        >
          Submit
        </button>

        {message.text && (
  <h1 className={`mt-7 font-bold text-xl ${message.type === "success" ? "text-green-700" : "text-red-700"}`}>
    {message.text}
  </h1>
)}

      </form>
    </div>
  );
}
