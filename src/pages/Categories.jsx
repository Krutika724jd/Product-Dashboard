import { useSelector } from 'react-redux'

const EMOJI = {
  Electronics: '🎧', Clothing: '👕', 'Home & Kitchen': '🏠',
  Sports: '⚽', Books: '📚', Beauty: '💄', Toys: '🧸', Automotive: '🚗'
}

const Categories = () => {
  const products = useSelector(s => s.products.items)

  const categories = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1
    return acc
  }, {})

  const maxCount = Math.max(...Object.values(categories))
 console.log(maxCount)
  return (
    <div className="px-6">
      <div className="text-xl font-semibold mb-6 dark:text-gray-100">Categories</div>
      <div className="grid lg:grid-cols-4 gap-4">
        {Object.entries(categories).map(([category, count]) => (
          <div key={category} className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-all cursor-pointer">
            <div className="text-3xl mb-2">{EMOJI[category] || '📦'}</div>
            <div className="font-medium text-sm">{category}</div>
            <div className="text-xs text-gray-400 mt-1">{count} products</div>
            <div className="h-1.5 bg-gray-100 rounded-full mt-3 overflow-hidden">
              <div
                className="h-full bg-blue-400 rounded-full"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories