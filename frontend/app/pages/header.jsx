"use client"

import { useRouter } from "next/navigation"

export default function Header(){

const router = useRouter();

  
    return(
    
    
    
<div className="w-full flex bg-blue-300 h-20 justify-between items-center "> 
    <h1 className="text-3xl font-bold ml-3 ">TASK MANG</h1>
  <div className="w-[40%]">
    <button className="bg-black text-white p-3 rounded-md mr-6 w-[37%]" onClick={() => router.push("/register")}> Register </button>
    <button className="bg-black text-white p-3 rounded-md mr-6 w-[35%]" onClick={() => router.push("/login")}> login </button>
    </div>
 </div>)
}