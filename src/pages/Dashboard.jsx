import { useDispatch, useSelector } from "react-redux"
import KpiCard from "../components/KpiCard";
import { useState } from "react";
import ProductTable from "../components/ProductTable";
import ProductModel from "../components/ProductModel";
import { deleteProduct } from "../features/products/productsSlice";

const Dashboard = () => {
  const products=useSelector(state=>state.products.items);
  const dispatch=useDispatch()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditing]  = useState(null);
  const openEdit=(product)=>{ setEditing(product); setModalOpen(true)}
 const totalProducts=products.length;
 //totalValue=sum of price × stock 
 //acc => the result of previous value
 const totalValue=Math.ceil(products.reduce((acc,curr)=> acc+ curr.price*curr.stock,0))
 const outOfStock=products.filter(p=>p.status === 'Out of Stock').length;
 const categories= new Set(products.map(p=>p.category)).size
//  const totalCategory=Object.values(categories)
  console.log(products,categories,outOfStock,totalValue)

  const [activeFilter, setActiveFilter] = useState('All')
  const [sortBy, setSortBy]= useState('name')
  const filters = ['All', 'Active', 'Draft', 'Out of Stock', 'In Review'];

  const filteredItems=products.filter(product=>activeFilter === 'All'||product.status=== activeFilter)
  .sort((a,b)=>{
    if(sortBy === 'price-asc') return a.price-b.price
    if(sortBy === 'price-desc') return b.price-a.price
    if(sortBy === 'stock')      return b.stock-a.stock
    return a.name.localeCompare(b.name)
  }
  
)

  const handleDelete=(id)=>{
   if (confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id))
    }
  }
  console.log({filteredItems,sortBy})
  return (
    <>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* <div className="border border-gray-400 rounded-lg flex flex-col gap-2 w-[25%]  p-4 bg-white">
        <div>TOTAL PRODUCTS</div>
        <div className="font-semibold text-4xl">{totalProducts}</div>
        <div>12% vs last month</div>
      </div>
        <div className="border border-gray-400 rounded-lg flex flex-col w-[25%] gap-2 p-4 bg-white">
        <div>INVENTORY VALUE</div>
        <div className="font-semibold text-4xl">{totalValue}</div>
        <div>12% vs last month</div>
      </div>
        <div className="border border-gray-400 rounded-lg flex flex-col w-[25%] gap-2 p-4 bg-white">
        <div>OUT OF STOCK</div>
        <div className="font-semibold text-4xl">{outOfStock.length}</div>
        <div>12% vs last month</div>
      </div>
        <div className="border border-gray-400 rounded-lg flex flex-col gap-2 w-[25%] gap-2 p-4 bg-white">
        <div>CATEGORIES</div>
        <div className="font-semibold text-4xl">{categories}</div>
        <div>across all products</div>
      </div> */}
    <KpiCard label="TOTAL PRODUCTS" value={totalProducts} subText="↑ 12% vs last month"/>
    <KpiCard label="INVENTORY VALUE" value={totalValue} subText="↑ 8.3% total worth"/>
    <KpiCard label="OUT OF STOCK" value={outOfStock} subText="↑ 3 since last week"/>
    <KpiCard label="CATEGORIES" value={categories} subText="across all products"/>
    </div>
      {/* Filter Buttons + Sort — stays here, no separate component needed */}
     <div className="flex gap-2 lg:gap-5 mt-5 w-full">
      {filters.map(filter=>(
        <button key={filter} className={`lg:px-4 lg:py-2 p-2 rounded-lg text-sm font-medium border transition-all
        ${activeFilter === filter
          ? 'bg-blue-600 text-white border-blue-600'
          : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
        }`}
        onClick={()=>setActiveFilter(filter)}>{filter}</button>
      ))}
     </div>

     {/* sort byt filter*/}

     <select className="mt-4 w-full px-3 py-2 rounded-lg border border-gray-400 text-gray-600 text-sm font-medium" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
      <option value="name">Sort By: Name</option>
      <option value="price-asc">Price: Low → High</option>
      <option value="price-desc">Price: High → Low</option>
      <option value="stock">Stock</option>
     </select>

     <ProductTable products={filteredItems} onEdit={openEdit} onDelete={handleDelete}/>
      {modalOpen &&(
        <ProductModel
        product={editingProduct}
        onClose={() => setModalOpen(false)}
        />
      )}
    </>
  )
}

export default Dashboard