import { useSelector } from "react-redux"

const COLORS = {
  'Active':       { border: 'border-green-400', text: 'text-green-600', bg: 'bg-green-400' },
  'Draft':        { border: 'border-gray-400',  text: 'text-gray-600',  bg: 'bg-gray-400' },
  'Out of Stock': { border: 'border-red-400',   text: 'text-red-600',   bg: 'bg-red-400'  },
  'In Review':    { border: 'border-blue-400',  text: 'text-blue-600',  bg: 'bg-blue-400' },
}
function StatusCard({status,count}){
    const color=COLORS[status]
    return(
        <div className={`border-l-4 ${color.border}} rounded-md bg-gray-200 p-4`}>
            <div className={`text-2xl ${color.text}`}>{count}</div>
            <div>{status}</div>
        </div>
    )
}

const Analytics = () => {
    const products=useSelector(state=>state.products.items);
    //by status
    const active=products.filter(product=>product.status === 'Active').length;
    const Draft=products.filter(product=>product.status === 'Draft').length
    const Out_of_Stock=products.filter(product=>product.status === 'Out of Stock').length
    const In_Review=products.filter(product=>product.status === 'In Review').length;
    // const filtered = [...new Set(products.map(p => p.category))];
    //by category
    const categories=products.reduce((acc,product)=>{
        acc[product.category]=(acc[product.category]||0)+1;
        return acc;
    },{});
    const categoryList = Object.keys(categories)
    const maxCount     = Math.max(...Object.values(categories))
    //for(let i=0;i<products.length;i++){
    //    let category=products[i].category;
    //   result[category]=(result[category] || 0)+1
    //}
    console.log(categories,"re")
    const top5Products = products
  .map(product => ({
    ...product,
    inventoryValue: product.price * product.stock
  }))
  .sort((a, b) => b.inventoryValue - a.inventoryValue) // descending
  .slice(0, 5);
    //console.log(top5Products,filtered)
  return (
    <div className="lg:px-6 overflow-hidden">
     <div className="text-xl font-semibold mb-6 dark:text-gray-100">Analytics</div>
     <div className="grid lg:grid-cols-2 border gap-6">
        <div className="border border-gray-300 bg-white rounded-md p-2 lg:p-4 overflow-hidden">
           <div className="uppercase text-xs text-gray-500">Products by category</div>
           {categoryList.map(category=>(
            <div key={category} className="">
                <div className="flex justify-between px-2">
                    <div>{category}</div>
                    <div>{categories[category]}</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-blue-400 rounded-full"
                  style={{ width: `${(categories[category] / maxCount) * 100}%` }}
                />
              </div>
            </div>
            
           ))}
        </div>
        <div className="border border-gray-300 bg-white rounded-md p-4 overflow-hidden">
             <div className="uppercase text-xs text-gray-500">Products by status</div>
             <div className="grid grid-cols-2 gap-2 mt-2">
               <StatusCard status="Active" count={active} />
               <StatusCard status="Draft" count={Draft}/>
               <StatusCard status="Out of Stock" count={Out_of_Stock}/>
               <StatusCard status="In Review" count={In_Review}/> 
             </div>
             <hr className="my-4 w-full"></hr>
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 items-center">
            {Object.keys(COLORS).map(status => (
              <div key={status} className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${COLORS[status].bg}`}></div>
                <span className="text-xs text-gray-500">{status}</span>
              </div>
            ))}
             </div>
        </div>
        
     </div>
     <div className="border border-gray-300 bg-white rounded-md p-4 mt-6">
        <div className="uppercase text-xs text-gray-500">Top 5 products by inventory value</div>
        {top5Products.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 mb-3">
            <span className="text-yellow-500 font-mono font-semibold w-6">#{i + 1}</span>
            <span className="flex-1 text-sm">{p.name}</span>
            <span className="text-green-600 font-mono text-sm font-semibold">
              {p.inventoryValue.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
            </span>
            <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-400 rounded-full"
                style={{ width: `${(p.inventoryValue / top5Products[0].inventoryValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
     </div>
    </div>
  )
}

export default Analytics