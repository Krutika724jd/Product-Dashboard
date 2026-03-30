import React, { useState } from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
const MainLayout = () => {
  const navigate=useNavigate()
  const [isMenuOpen,setMenuOpen]=useState(false)
  const handleLogout=()=>{
    logout();
    navigate("/")
  }
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/dashboard/products", label: "Products" },
    { to: "/dashboard/analytics", label: "Analytics" },
    { to: "/dashboard/categories", label: "Categories" },
    { to: "/dashboard/orders", label: "Orders" },
    { to: "/dashboard/settings", label: "Settings" },
  ];
 
  return (
<div className="flex w-full h-screen bg-gray-50 border dark:bg-[#121212]">

  {/* Sidebar */}
  <div className="hidden lg:w-[20%] lg:block p-4 border-r-2 bg-white dark:bg-[#1a1a1a] 
border-gray-200 dark:border-gray-700">
     {/* Logo */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-blue-600">ProductOS</h1>
          <p className="text-xs text-gray-400">Management System</p>
        </div>
     {/* Nav Links */}
        <nav className="flex flex-col gap-1 flex-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all
                ${location.pathname === link.to
                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

          {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-auto px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg text-left transition-all"
        >
          Logout
        </button>
      
  </div>
  {/* Main Content */}
      <main className=" w-full lg:w-[80%] flex flex-col">

        {/* Navbar */}
        <div className="h-16 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between">
          
          {/* Page Title */}
         <h2 className="hidden md:block text-base font-semibold text-gray-800 dark:text-white">
        {navLinks.find(l => l.to === location.pathname)?.label || 'Dashboard'}
         </h2>

          {/* Right side */}
          <div className=" hidden lg:flex items-center gap-3" onClick={()=>navigate("/dashboard/settings")}>
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
              A
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-100" >Admin</span>
          </div>
          {/* hamburger menu*/}
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col gap-1 p-2"
            >
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${isMenuOpen? 'rotate-45 translate-y-1.5' : ''}`}/>
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}/>
              <span className={`block w-5 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}/>
            </button>
          
        </div>
        {/* MOBILE DRAWER */}
        {isMenuOpen && (
          <div className='lg:hidden border'>
           <nav className={`flex flex-col gap-1 flex-1 `}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-sm text-center font-medium transition-all
                ${location.pathname === link.to
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
         <hr className="my-1 border-gray-100"/>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-lg text-left"
            >
              🚪 Logout
            </button>
          </div>
        )}
    {/*Page Title*/}
     <div className='flex gap-5 mx-6 h-10 items-center dark:bg-[#1a1a1a]'>
      {navLinks.filter(link=> link.label==='Dashboard' || link.label==='Analytics')
      .map(link=>(<div key={link.label} className={`pb-1 ${location.pathname === link.to? 'text-blue-600 border-b-2 border-blue-700':'border-transparent'}`}>{link.label}</div>))
      }
     </div>
     
     
     {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-200 dark:bg-[#121212]">
          <Outlet />
        </div>
  </main>

</div>
  )
}

export default MainLayout