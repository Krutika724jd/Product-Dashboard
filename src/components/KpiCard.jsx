import React from 'react'

const KpiCard = ({label,value,subText}) => {
  return (
   < >
      <div className="border border-gray-400 rounded-lg flex flex-col gap-2 w-[25%]  p-4 bg-white">
        <div className='text-xs text-gray-500 font-medium uppercase tracking-wide'>{label}</div>
        <div className="font-semibold text-4xl">{value}</div>
        <div className='text-sm text-gray-500'>{subText}</div>
      </div>
    </>
  )
}

export default KpiCard