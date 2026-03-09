import React, { useState } from 'react'
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate()
  const[email,setEmail]=useState('');
   const handleLogin=(e)=>{
    e.preventDefault()
    login(email);
    navigate("/dashboard")
   }
  return (
    <>
    <div className='border-2 w-[30%] flex items-start justify-center h-35 m-6 p-4 border-black'>
      <form className='flex gap-4' onSubmit={handleLogin}>
        <input type="text" 
        value={email}
        placeholder="Enter your email" 
        className='outline-none border focus:outline placeholder:pl-4'
        onChange={(e)=>setEmail(e.target.value)}
        />
        <button className='bg-red-400 px-4 rounded-md'>Login</button>
      </form>
    </div>
    </>
  )
}

export default Login