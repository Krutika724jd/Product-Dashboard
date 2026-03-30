import { useEffect, useState } from "react"

export default function useTheme(){
  const[theme,setTheme]=useState(localStorage.getItem('theme') || 'Light');

  useEffect(()=>{
    const root=document.documentElement;// add to html
    if(theme==='Dark'){
        root.classList.add('dark')
    }else if(theme === 'Light'){
        root.classList.remove('dark')
    }else{
        // System
     const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark ? root.classList.add('dark') : root.classList.remove('dark')
    }
    localStorage.setItem('theme',theme)
  },[theme])
    return{theme, setTheme}
}