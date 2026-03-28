import { useState } from "react";

function Settings() {
    const [activeTab, setActiveTab] = useState('Profile')
    const [form, setForm] = useState({
    firstName: 'Admin', lastName: 'User',
    email: 'admin@example.com', role: 'Product Manager'
  });
  const[notifications,setNotifications]=useState({
    email:true,stock:false,orders:false
  })
  const [theme,setTheme]=useState('Light');
  const [density,setDensity]=useState('Comfortable')
  const[saved,setSaved]=useState(false);
  const tabs = ['Profile', 'Notifications', 'Security', 'Appearance'];
  const set=(k,v)=>setForm(f=>({...f,[k]:v}))
  const handleNotifi=(key)=> setNotifications(n=>({...n,[key]:!n[key]}))
    function handleSave(){
        localStorage.setItem('userProfile', JSON.stringify(form))
        setSaved(true);
        setTimeout(() => setSaved(false), 2000)
    }
    console.log(form,notifications)
  return (
    <div className=" lg:overflow-hidden">
        <div className="text-xl font-semibold mb-6">Settings</div>
        <div className="grid lg:grid-cols-[200px_1fr] gap-6 ">
            <div className="flex lg:flex-col lg:gap-1 ">
               {tabs.map(tab=>(
                <button  
                onClick={()=> setActiveTab(tab)}
                className={`lg:px-4 py-2.5 px-2 rounded-md text-left transtion-all ${activeTab === tab
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-500 hover:bg-gray-100'}`}
                >{tab}</button>
               ))}
            </div>

            <div  className="bg-white border border-gray-200 rounded-lg p-6">
            {/* Profile */}
            {activeTab === 'Profile' && (
            <div>
                <h3 className="font-medium text-base mb-1">Profile Settings</h3>
                <p className="text-xs text-gray-400 mb-5">Update your personal information</p>
            <div className="grid grid-cols-2 gap-4">
            {[
                  { label: 'First Name', key: 'firstName' },
                  { label: 'Last Name',  key: 'lastName'  },
                ].map(({ label, key }) => (
                  <div key={key}>
                    <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">{label}</label>
                    <input
                      value={form[key]}
                      onChange={e => set(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                ))}
                 {[
                  { label: 'Email', key: 'email' },
                  { label: 'Role',  key: 'role'  },
                ].map(({ label, key }) => (
                  <div key={key} className="col-span-2">
                    <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">{label}</label>
                    <input
                      value={form[key]}
                      onChange={e => set(key, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                ))}
             </div>
              <button
                onClick={handleSave}
                className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
              >
                {saved ? '✅ Saved!' : 'Save Changes'}
              </button>
             </div>
            )}
            <hr className="my-4"></hr>
            {/* Notifications */}
            {activeTab === 'Notifications' && (
                <div>
                 <h3 className="font-medium text-base mb-1">Notifications</h3>
                 <p className="text-xs text-gray-400 mb-5">Manage your notification preferences</p>
                 {[
                { key: 'email',  label: 'Email Notifications', sub: 'Receive updates via email'              },
                { key: 'stock',  label: 'Stock Alerts',         sub: 'Alert when product goes out of stock'  },
                { key: 'orders', label: 'Order Updates',        sub: 'Get notified on order status changes'  },
              ].map(({key,label,sub})=>(
                <div className="flex justify-between" key={key}>
                  <div>
                     <div className="text-sm font-medium">{label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{sub}</div> 
                </div>
                <button 
                onClick={()=>handleNotifi(key)}
                className={`w-10 h-6 rounded-full transition-all relative ${notifications[key] ? 'bg-blue-500' : 'bg-gray-200'}`}>
                 <span className={`absolute h-5 w-5 bg-white rounded-full top-[2px] ${notifications[key]?'right-[1px]':'left-[1px]'}`}></span>
                </button>
                </div>
              ))}
                </div>
            )}
              {/* Security*/}
            {activeTab === 'Security' && (
            <div>
              <h3 className="font-medium text-base mb-1">Change Password</h3>
              <p className="text-xs text-gray-400 mb-5">Update your password to keep your account secure</p>

            {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
             <div key={label} className="mb-4">
             <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">{label}</label>
             <input type="password" placeholder="••••••••"
             className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
            />
            </div>
            ))}

            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all">
            Update Password
            </button>
            
        </div>
            )}
            {/*Appearance*/}
            {activeTab === 'Appearance' &&(
              <div>
                 <h3 className="font-medium text-base mb-1">Theme</h3>
                 <p className="text-xs text-gray-400 mb-4">Choose your preferred color theme</p>
                 <div className="grid grid-cols-3 gap-3">
                  {[
                    {name:'Light',bg: 'bg-gray-50'},
                    { name: 'Dark',bg: 'bg-gray-900'  },
                    { name: 'System', bg: 'bg-gradient-to-br from-gray-50 to-gray-900' },
                  ].map(({name,bg})=>(
                    <div key={name} className={` p-4  border rounded-md ${theme === name ? 'border-blue-400 bg-blue-50':'border-gray-200 hover:border-gray-300'}`}
                    onClick={()=>setTheme(name)}>
                       <div className={`h-16 w-full border rounded-md ${bg}`}></div>
                       <div className="text-center mt-2">{name}</div>
                    </div>
                  ))}
                </div>
                <hr className="my-4"></hr>
                <h3 className="font-medium text-base mb-1">Layout Density</h3>
                <p className="text-xs text-gray-400 mb-4">Control the spacing of the interface</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Comfortable','Compact','Spacious'].map((d=>(
                    <div 
                    key={d}
                    onClick={()=> setDensity(d)}
                    className={`flex-1 py-2.5 rounded-lg text-sm text-center border transition-all
                   ${density === d
                   ? 'border-blue-400 bg-blue-50 text-blue-600 font-medium'
                   : 'border-gray-200 text-gray-500 hover:border-gray-300'
                   }`}>{d}</div>
                  )))}
                </div>
                <button className="px-5 border mt-4 rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition-all" >
                  Save Appearance 
                </button>
              </div>
            )}
         </div>
        </div>
    </div>
  )
}

export default Settings