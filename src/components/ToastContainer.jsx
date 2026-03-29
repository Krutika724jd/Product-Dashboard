import Toast from "./Toast"


function ToastContainer({toasts,removeToast}) {
  return (
    <div className='fixed top-6 left-1/2 -translate-x-1/2  flex flex-col gap-3 z-50'>
     {toasts.map(toast=>(
      <Toast
      key={toast.id}
      message={toast.message} 
      type={toast.type}
      onClose={()=>removeToast(toast.id)}
      />
     ))
     }
    </div>
  )
}

export default ToastContainer