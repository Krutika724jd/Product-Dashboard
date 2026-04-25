
const EMOJI = {
  Electronics: '🎧', Clothing: '👕', 'Home & Kitchen': '🏠',
  Sports: '⚽', Books: '📚', Beauty: '💄', Toys: '🧸', Automotive: '🚗'
}
const TABLEHEADER=['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'];
export default function ProductTable({products,onEdit,onDelete}){
    return( 
        <div className="mt-4 bg-white border border-gray-200 rounded-lg overflow-x-scroll lg:overflow-hidden">
           <table className="w-full">
            <thead>
                <tr>
                    {TABLEHEADER.map(header=>(
                       <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">{header}</th>
                    ))}
                    
                </tr>
            </thead>
            <tbody className={`${products.length === 0 ? 'flex items-center justify-center w-full':''}`}>
                {products.length > 0 ? products.map(product=>(
                    <tr>
                     <td key={product._id}>
                       <div className="flex gap-3 items-center">
                        <div className=" ml-3 w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-lg">{ EMOJI[product.category] || '📦'}</div>
                        <div>
                            <div>{product.name}</div>
                            <div>{product.sku}</div>
                        </div>
                       </div>
                     </td>
                     <td>{product.category}</td>
                     <td>{product.price}</td>
                     <td>{product.stock}</td>
                     <td>{product.status}</td>
                      {/* Actions */}
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <button onClick={()=>onEdit(product)} className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100 mr-1">✏️</button>
                    <button className="text-xs px-2 py-1 rounded border border-gray-200 hover:bg-gray-100" onClick={()=> onDelete(product._id)}>🗑️</button>
              </td>
                    </tr>
                )):
                <div className="text-center">No Product Found.</div>}
            </tbody>
            
           </table>
        </div>
    )
}