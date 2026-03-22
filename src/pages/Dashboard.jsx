import { useSelector } from "react-redux"
import KpiCard from "../components/KpiCard";

const Dashboard = () => {
  const products=useSelector(state=>state.products.items);
 const totalProducts=products.length;
 //totalValue=sum of price × stock 
 //acc => the result of previous value
 const totalValue=products.reduce((acc,curr)=> acc+ curr.price*curr.stock,0)
 const outOfStock=products.filter(p=>p.status === 'Out of Stock').length;
 const categories= new Set(products.map(p=>p.category)).size
//  const totalCategory=Object.values(categories)
  // console.log(products,categories,totalCategory,outOfStock,totalValue)
  return (
    <>
    <div className="flex gap-4">
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
    </>
  )
}

export default Dashboard