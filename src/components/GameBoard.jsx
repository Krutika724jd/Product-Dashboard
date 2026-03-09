import React, { useState } from 'react'

function GameBoard({onPlayerSelect,activePlayerSymbol}) {
    const intialBoard=[
        [null,null,null],
        [null,null,null],
        [null,null,null],
    ]
    const[gameBoard,setGameBoard]=useState(intialBoard);
    console.log(gameBoard)
  const handleSelectSquare=(rowIndex,colsIndex)=>{
    console.log(12)
    onPlayerSelect();
      setGameBoard(prevgameBoard=> {
        let updatedGameBoard=[...prevgameBoard.map(inneArrayy => [...inneArrayy])]
        updatedGameBoard[rowIndex][colsIndex]=activePlayerSymbol;
        return updatedGameBoard;
      });
      
  }
  return (
    <div className='bg-white p-10 grid grid-cols-3 gap-6'>
  {gameBoard.map((row, rowIndex) =>
    row.map((playerSymbol, colsIndex) => (
      <div
        key={`${rowIndex}-${colsIndex}`}
        className='bg-gray-400 w-22 h-20 flex items-center justify-center text-3xl font-bold cursor-pointer'
        onClick={()=> handleSelectSquare(rowIndex,colsIndex)}
      >
        {activePlayerSymbol}
      </div>
    ))
  )}
</div>
  )
}

export default GameBoard