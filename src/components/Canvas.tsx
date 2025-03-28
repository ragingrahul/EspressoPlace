import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  handleCellClick: (row: number, col: number) => void;
  gridColors: string[][];
  setCoordinates: Dispatch<SetStateAction<{ x: number; y: number }>>;
};
function Canvas({ handleCellClick, gridColors, setCoordinates }: Props) {
  const gridRows = 100;
  const gridCols = 200;
  const [cellHover, setCellHover] = useState<any>(null);

  const generateGridCells = () => {
    const cellSize = 4;
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
              boxShadow:
                cellHover && cellHover.x === row && cellHover.y === col
                  ? 'inset 0 0 0 0.5px rgba(0, 0, 0, 0.5)'
                  : '0 0 0 0 rgba(0, 0, 0, 0)',
            }}
            onClick={() => {
              setCoordinates({ x: row, y: col });
              handleCellClick(row, col);
            }}
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
