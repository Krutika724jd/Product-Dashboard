import React from 'react'
import { Link,Outlet, useNavigate } from 'react-router-dom'
import { logout } from '../utils/auth'
const MainLayout = () => {
  const navigate=useNavigate()
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
<div className="flex h-screen bg-gray-50">

  {/* Sidebar */}
  <div className="w-[20%]  border-r-2 p-4">
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
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
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
      <main className="w-[80%] flex flex-col">

        {/* Navbar */}
        <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          
          {/* Page Title */}
          <h2 className="text-lg font-semibold text-gray-800">
            {location.pathname === '/dashboard/products' ? 'Products' : 'Dashboard'}
          </h2>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
              A
            </div>
            <span className="text-sm text-gray-600">Admin</span>
          </div>
        </div>
    {/*Page Title*/}
     <div className='flex gap-5 mx-6 h-10 items-center'>
      {navLinks.filter(link=> link.label==='Dashboard' || link.label==='Analytics')
      .map(link=>(<div key={link.label} className={`pb-1 ${location.pathname === link.to? 'text-blue-600 border-b-2 border-blue-700':'border-transparent'}`}>{link.label}</div>))
      }
     </div>
     {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-200">
          <Outlet />
        </div>
  </main>

</div>
  )
}

export default MainLayout