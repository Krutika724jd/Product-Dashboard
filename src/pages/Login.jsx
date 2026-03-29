import React, { useEffect, useState } from 'react'
import { login } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'

const Login = () => {
  const navigate=useNavigate()
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const [error, setError]= useState('');
  // 👇 if already logged in, skip login page
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard')
    }
  }, [])
   const handleLogin=(e)=>{
    e.preventDefault()
    const success = login(email, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password!')
    }
   }
  return (
    <>
    <div className='min-h-screen flex items-center border bg-gray-50 justify-center'>
      <div className='border border-gray-300 rounded-md bg-white p-6 lg:w-[25%]'>
         <div className="mb-6">
          <h1 className="text-xl font-bold text-blue-600 font-mono">PRODUCTOS</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to your account</p>
        </div>
       <form className='flex gap-4 flex-col' onSubmit={handleLogin}>
         <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
              Email
          </label>
          <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-all"
            />
          </div>
        {/* <input type="text" 
        value={email}
        placeholder="Enter your email" 
        className='outline-none border focus:outline placeholder:pl-4'
        onChange={(e)=>setEmail(e.target.value)}
        /> */}
        <div>
          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide block mb-1">
             Password
          </label>
          <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-400 transition-all"
            />
          </div>
            {/* Error */}
          {error && (
            <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all mt-2"
          >
            Sign In
          </button>
      </form>
      </div>
    </div>
    </>
  )
}

export default Login;