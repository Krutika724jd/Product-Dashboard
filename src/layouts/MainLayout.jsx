import React from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
const MainLayout = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    logout();
    navigate("/")
  }
  return (
<div className="flex h-screen">

  {/* Sidebar */}
  <div className="w-[20%] bg-slate-400 border-r-2 p-4">
    

    <nav className="mt-5">
      <h3 className="font-bold">Dashboard</h3>
      <ul className="flex flex-col gap-3 mt-3">
        <li><Link to="">Home</Link></li>
        <li><Link to="/dashboard/products">Products</Link></li>
      </ul>
    </nav>
    <button onClick={handleLogout}>Logout</button>
  </div>

  {/* Page Content */}
  <main className="w-[80%] p-6">
    <Outlet />
  </main>

</div>
  )
}

export default MainLayout