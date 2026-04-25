import { useEffect } from "react";

const STYLES = {
  success: { bg: 'bg-green-50 border-green-200', text: 'text-green-700', icon: '✅' },
  error:   { bg: 'bg-red-50 border-red-200',     text: 'text-red-700',   icon: '❌' },
  warning: { bg: 'bg-yellow-50 border-yellow-200',text: 'text-yellow-700',icon: '⚠️' },
  info:    { bg: 'bg-blue-50 border-blue-200',    text: 'text-blue-700',  icon: 'ℹ️' },
}
function Toast({message,type='success',onClose}) {
    const style=STYLES[type];
    useEffect(()=>{
      const timer=setTimeout(onClose,3000)
      return(()=> clearTimeout(timer))
    },[])
  return (
    <div className={`flex items-center  gap-3 px-4 py-3 rounded-xl border ${style.bg} shadow-md animate-slide-in`}>
      <div className="">{style.icon}</div>
      <div className={`${style.text}`}>{message}</div>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>
    </div>
  )
}

export default Toast