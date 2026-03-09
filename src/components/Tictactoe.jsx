import React, { useState } from 'react'
import Player from './Player'
import GameBoard from './GameBoard'
const Tictactoe = () => {
  const[activePlayer,setActivePlayer]=useState("X");
  console.log(activePlayer)
 const handleOnSelect=()=>{
    setActivePlayer((currActivePlayer)=>{
    currActivePlayer === "X" ? "O":"X";
    })
 }
  return (
    <div className='bg-yellow-300 min-h-screen  '>
        
        <div className='text-3xl font-bold'>Tic-Tac-Toe</div>
        <div className='bg-black border border-black mt-5 rounded-xl mx-auto w-[48rem]'>
          <div className='flex gap-5 p-4 '>

           <Player intialName="Player1" symbol="X" isActive={activePlayer === "X"}/>
           <Player intialName="Player2" symbol="O" isActive={activePlayer === "O"}/>
        </div>
        <div className='text-center text-3xl text-white'>Game Board
          <GameBoard onPlayerSelect={handleOnSelect} activePlayerSymbol={activePlayer}/>
        </div>
        </div>
       
        
    </div>
  )
}

export default Tictactoe