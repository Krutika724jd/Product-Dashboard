import React, { useState } from 'react'

const Player = ({intialName,symbol,isActive}) => {
  const[playerName,setPlayerName]=useState(intialName)
  const [isEditing,setIsEditing]=useState(false);
  const handleBtn=()=>{
    setIsEditing((isEditing)=>!isEditing)
  }
  const handleChange=(e)=>{
    setPlayerName(e.target.value)
  }
  let inputElement=<input type='text' value={playerName} className='w-24 outline-none border' onChange={handleChange}/>
  if(!isEditing){
    inputElement = <div className='bg-white w-24'>{playerName}</div>
  }
  return (
    <>
    <div className={`flex ${isActive?'border-yellow-400':''}  w-40 items-start`}>
    <div className='flex'>
       {inputElement}
       <div className='text-white'>{symbol}</div>
    </div>
    <button className='text-white ml-2' onClick={handleBtn}>{isEditing ? "Save" : "Edit"}</button>
    
    </div>
   
    
    </>
  )
}

export default Player