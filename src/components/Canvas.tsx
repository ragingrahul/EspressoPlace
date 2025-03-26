import React, { useState } from 'react';

function Canvas() {
  const gridRows = 50;
  const gridCols = 100;
  const [gridColors, setGridColors] = useState<string[][]>(
    Array.from({ length: 200 }, () => new Array(200).fill('white'))
  );

  const handleCellClick = (row: number, col: number) => {
    const updatedColors = [...gridColors];
    updatedColors[row][col] = 'red';
    setGridColors(updatedColors);
    console.log(row, col);
  };

  const generateGridCells = () => {
    const cellSize = 10;
    const gridCells = [];

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const cellColor = gridColors[row][col];
        gridCells.push(
          <div
            key={`${row}-${col}`}
            className='cursor-pointer transition duration-300'
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: cellColor,
            }}
            onClick={() => handleCellClick(row, col)}
          ></div>
        );
      }
    }

    return gridCells;
  };

  return (
    <div className='flex items-center flex-col'>
      <div className='flex flex-wrap w-[800px] border-red-500 border-2'>
        {generateGridCells()}
      </div>
    </div>
  );
}

export default Canvas;
