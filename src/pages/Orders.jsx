import { useState } from "react";

const fakeOrders = [
  { id:'ORD-001', customer:'Rahul Sharma',  product:'AirPods Pro Max',     amount:45999,  date:'22 Mar 2026', status:'Delivered'  },
  { id:'ORD-002', customer:'Priya Patel',   product:'Nike Air Max 270',    amount:12499,  date:'21 Mar 2026', status:'Pending'    },
  { id:'ORD-003', customer:'Amit Verma',    product:'Dyson V15 Detect',    amount:62999,  date:'20 Mar 2026', status:'Processing' },
  { id:'ORD-004', customer:'Sneha Iyer',    product:'Yoga Mat Premium',    amount:7499,   date:'19 Mar 2026', status:'Delivered'  },
  { id:'ORD-005', customer:'Vikram Singh',  product:'Canon EOS R6 II',     amount:209999, date:'18 Mar 2026', status:'Cancelled'  },
  { id:'ORD-006', customer:'Anjali Mehta',  product:'Atomic Habits',       amount:1499,   date:'17 Mar 2026', status:'Delivered'  },
  { id:'ORD-007', customer:'Rohan Das',     product:'LEGO Technic Set',    amount:19999,  date:'16 Mar 2026', status:'Pending'    },
  { id:'ORD-008', customer:'Kavya Nair',    product:'Charlotte Tilbury',   amount:6299,   date:'15 Mar 2026', status:'Processing' },
]
const BADGE = {
  'Delivered':  'bg-green-100 text-green-700',
  'Pending':    'bg-yellow-100 text-yellow-700',
  'Processing': 'bg-blue-100 text-blue-700',
  'Cancelled':  'bg-red-100 text-red-700',
}
function Orders() {
 const [filter, setFilter] = useState('All')
  const filtered = fakeOrders.filter(o => filter === 'All' || o.status === filter)
  const total=fakeOrders.length;
  const delivered=fakeOrders.filter(order=>order.status==='Delivered').length;
  const pending=fakeOrders.filter(order=>order.status==='Pending').length;
  const cancelled=fakeOrders.filter(order=>order.status==='Cancelled').length;
  return (
    <div>
        <div className="text-xl font-semibold mb-6">Orders</div>
         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orders', value: total,     color: 'text-gray-800'   },
          { label: 'Delivered',    value: delivered,  color: 'text-green-600'  },
          { label: 'Pending',      value: pending,    color: 'text-yellow-600' },
          { label: 'Cancelled',    value: cancelled,  color: 'text-red-600'    },
        ].map(k => (
          <div key={k.label} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-xs text-gray-400 uppercase font-medium mb-2">{k.label}</div>
            <div className={`text-2xl font-semibold font-mono ${k.color}`}>{k.value}</div>
          </div>
        ))}
         </div>
         {/* Filter Buttons */}
      <div className="flex gap-3 mb-4">
        {['All', 'Delivered', 'Pending', 'Processing', 'Cancelled'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border transition-all
              ${filter === s
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
              }`}
          >{s}</button>
        ))}
      </div>
         {/* Orders Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-x-scroll">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                     <tr>
              {['Order ID', 'Customer', 'Product', 'Amount', 'Date', 'Status'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
                </thead>
                <tbody>
                    {filtered.map(o=>(
                    <tr key={o.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                      <td className="px-4 py-3 font-mono text-sm text-gray-500">#{o.id}</td>
                <td className="px-4 py-3 font-medium text-sm">{o.customer}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{o.product}</td>
                <td className="px-4 py-3 font-mono text-sm font-semibold">
                  {o.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400">{o.date}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${BADGE[o.status]}`}>
                    {o.status}
                  </span>
                </td>
                    </tr>
                    ))}
                </tbody>
            </table>
          </div>
    </div>
  )
}

export default Orders