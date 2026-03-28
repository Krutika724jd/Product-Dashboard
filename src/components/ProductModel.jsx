import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addProduct, updateProduct } from "../features/products/productsSlice"

 const CATEGORIES = ['Electronics','Clothing','Home & Kitchen','Sports','Books','Beauty','Toys','Automotive']
 const STATUSES   = ['Active', 'Draft', 'Out of Stock', 'In Review']
function ProductModel({product,onClose}) {
    const dispatch=useDispatch()
    const [form, setForm] = useState({
    name: '', sku: '', category: 'Electronics',
    price: '', stock: '', status: 'Active', desc: ''
  })
   const set=(k,v)=> setForm(f=>({...f,[k]:v}))
   console.log(product,form)
   useEffect(() => {
  if (product) {
    setForm({
      ...product,
      price: String(product.price),  // 👈 number → string
      stock: String(product.stock),  // 👈 number → string
    })
  }
}, [product])

function handleSave(){
     if (!form.name || !form.sku || !form.price || !form.stock) {
    alert('Please fill all required fields!')
    return
  }
    const data={...form,
        price:Number(form.price),
        stock:Number(form.stock)
    }
    product?dispatch(updateProduct(data)):dispatch(addProduct(data))
}
  return (
    <div className="border border-red-400 fixed inset-0 bg-black/40  z-50 flex items-center justify-center"
    onClick={onClose}>
        <div onClick={e => e.stopPropagation()}
        className="bg-white rounded-xl p-6 w-[500px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold mb-6">{product ? 'Edit Product' : 'Add New Product'} </h2>
              <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-lg border rounded-xl px-4 py-2">✕</button>
            </div>
            {/* Form*/}
            <div className=" grid grid-cols-2 gap-2">
               <div className="col-span-2">
                <label className="uppercase text-xs font-medium text-gray-400">Product Name</label>
                <input
                value={form.name}
                placeholder="e.g. Wireless Headphones"
                onChange={(e)=>set('name',e.target.value)}
                className="w-full border border-gray-400 rounded-lg outline-none p-2 focus:focus:border-blue-400 shadow-md"/>
               </div>

               <div className="">
                <label className="uppercase text-xs text-gray-400">sku</label>
                <input
                value={form.sku}
                placeholder="e.g. WHP-001"
                onChange={(e)=>set('sku',e.target.value)}
                className="w-full border border-gray-400 rounded-lg outline-none p-2 focus:focus:border-blue-400 shadow-md"/>
               </div>
              
              <div>
            <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Category</label>
            <select value={form.category} onChange={e => set('category', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400">
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
              </div>
               <div className="">
                <label className="uppercase text-xs text-gray-400">Price</label>
                <input
                onChange={(e)=>set('price',e.target.value)}
                className="w-full border border-gray-400 rounded-lg outline-none p-2 focus:focus:border-blue-400 shadow-md"/>
               </div>
               <div className="">
                <label className="uppercase text-xs text-gray-400">stock</label>
                <input
                onChange={(e)=>set('stock',e.target.value)}
                className="w-full border border-gray-400 rounded-lg outline-none p-2 focus:focus:border-blue-400 shadow-md"/>
               </div>
               
             <div className="">
            <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400">
              {STATUSES.map(c => <option key={c}>{c}</option>)}
            </select>
             </div>
            <div className="col-span-2">
            <label className="text-xs text-gray-400 uppercase tracking-wide font-medium block mb-1">Description</label>
            <textarea value={form.desc} onChange={e => set('desc', e.target.value)}
              placeholder="Product description…" rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:focus:border-blue-400 shadow-md resize-none"/>
          </div>
           </div>
           <hr className="my-3"></hr>
           <div className="flex justify-end gap-4">
            <button className="px-4 py-2 border border-gray-400 rounded-lg font-medium" onClick={onClose}>Cancel</button>
            <button className="px-4 py-2 border border-gray-400 rounded-lg font-medium" onClick={()=>handleSave(product)}>Save Product</button>
           </div>
        </div>
        
    </div>
  )
}

export default ProductModel