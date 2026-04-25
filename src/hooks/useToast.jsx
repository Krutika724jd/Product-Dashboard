import { useState } from "react"


function useToast() {
 const [toasts,setToasts]=useState([]);
 const showToast=({message="product",type="success"})=>{
    const id=Date.now();
    setToasts(t=>[...t,{id,message,type}])
 }
 const removeToast=(id)=>{
    setToasts(prev=>prev.filter(t=>t.id != id))
 }
  return {toasts,showToast,removeToast}
}

export default useToast