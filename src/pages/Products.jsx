import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductModel from '../components/ProductModel';
import { deleteProduct,addProduct } from '../features/products/productsSlice';
import ToastContainer from '../components/ToastContainer';
import useToast from '../hooks/useToast';
const EMOJI = {
  Electronics: '🎧', Clothing: '👕', 'Home & Kitchen': '🏠',
  Sports: '⚽', Books: '📚', Beauty: '💄', Toys: '🧸', Automotive: '🚗'
}

const BADGE = {
  'Active':       'bg-green-100 text-green-700',
  'Draft':        'bg-gray-100 text-gray-600',
  'Out of Stock': 'bg-red-100 text-red-600',
  'In Review':    'bg-blue-100 text-blue-600',
}
const Products = () => {
  const { products, loading } = useSelector((state) => state.products);
  const{toasts,showToast,removeToast}=useToast();
  console.log({toasts})
  const dispatch=useDispatch()
  const[search,setSearch]=useState('');
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditing]  = useState(null)
  const filtered=products.filter(p=>
     p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  )
  const openAdd=()=>{ setEditing(null); setModalOpen(true)}
  const openEdit=(product)=>{ setEditing(product); setModalOpen(true)}
  const handleDelete = async (id) => {
  try {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProduct(id)).unwrap();
      //alert("Product deleted successfully");
      showToast({message:'Product deleted successfully!', type:'warning'})
    }
  } catch (err) {
    console.error(err);
    alert("Failed to delete product");
  }
};
  if (loading) return <p>Loading...</p>;
  console.log(products)
  return (
    <div>
     <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold dark:text-gray-100">Products</h2>
        <button
          onClick={openAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all"
        >
          + Add Product
        </button>
      </div>
      {/* Search */}
      <div className="relative mb-4 w-64">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or SKU..."
          className="w-full border border-gray-200 rounded-lg pl-8 pr-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>

      {/*Products*/}
     <div className='bg-white border border-gray-200 rounded-lg overflow-x-scroll lg:overflow-hidden'>
      <table className='w-full>'>
        <thead className='bg-gray-50 border-b border-gray-200 w-full'>
          <tr className=''>
            {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions']
            .map(h=>(
              <th key={h} className='px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wide'  >{h}</th>
            ))}
            
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-12 text-gray-400 text-sm">No Product Found</td></tr>
          ):(
            filtered.map(product=>(
              <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                <td >
                  <div className='flex gap-3 items-center'>
                    <div className=' ml-3 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg'>{EMOJI[product.category] || '📦'}</div>
                    <div>
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-gray-400 font-mono">{product.sku}</div>
                    </div>
                  </div>
                </td>
                <td  className="px-4 py-3">{product.category}</td>
                <td  className="px-4 py-3">{product.price}</td>
                <td  className="px-4 py-3">{product.stock}</td>
                <td className='px-4 py-3'> <span className={`text-xs px-2 py-1 rounded-full font-medium ${BADGE[product.status]}`}>
                      {product.status}
                    </span></td>
                 {/* Actions */}
                  <td className="px-4 py-3 border">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(product)}
                        className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all"
                      >✏️ Edit</button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-xs px-3 py-1.5 border border-red-100 text-red-500 rounded-lg hover:bg-red-50 transition-all"
                      >🗑️ Delete</button>
                    </div>
                  </td>
              </tr>
            ))
          )
          }
        </tbody>
      </table>
     <ToastContainer toasts={toasts} removeToast={removeToast}/>
      {/* Modal */}
      {modalOpen && (
        <ProductModel
          product={editingProduct}
          onClose={() => setModalOpen(false)}
          showToast={showToast}
        />
      )}
     </div>

    </div>
    
    
  )
}

export default Products;