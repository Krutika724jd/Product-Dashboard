import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { deleteProduct,addProduct } from '../features/products/productsSlice';
const Products = () => {
  const products=useSelector((state)=>state.products.items);
  const dispatch=useDispatch()
  const handleDelete=(id)=>{
    console.log(12)
    dispatch(deleteProduct(id));
  }
  console.log(products)
  return (
    <>
     <h1>Products page</h1>
    <div className=' grid lg:grid-cols-3 gap-4 m-4'>
         {products.map(product=>{
    return (
      <div className='border rounded-xl flex flex-col p-4 gap-2 bg-white'>
        <div key={product.id} className='font-bold text-center text-xl'>{product.name}</div>
        <div>{product.description}</div>
        <div className='flex justify-between'>
           <div>Price:{product.price}</div>
           <div className='border px-4'>
            <button className='border-r' onClick={()=> dispatch(addProduct(product.id))}>+</button>
            <button onClick={()=>handleDelete(product.id)}>-</button>
          </div>
          
        </div>
        
        <button className='p-2 border bg-red-600 rounded-lg text-white text-md'>Buy Now</button>
      </div>
    
      )})}
    </div>
   
    </>
   
    
  )
}

export default Products