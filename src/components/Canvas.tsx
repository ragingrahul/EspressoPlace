import React, { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  handleCellClick: (row: number, col: number) => void;
  gridColors: string[][];
  setCoordinates: Dispatch<SetStateAction<{ x: number; y: number }>>;
};
function Canvas({ handleCellClick, gridColors, setCoordinates }: Props) {
  const gridRows = 100;
  const gridCols = 200;
  const [cellHover, setCellHover] = useState<{ x: number; y: number } | null>(
    null,
  );

  const generateGridCells = () => {
    const cellSize = 4;
    const gridCells = [];

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        const cellColor = gridColors[row][col];
        gridCells.push(
          <div
            key={`${row}-${col}`}
            className='cursor-pointer transition-all duration-200'
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              backgroundColor: cellColor,
              boxShadow:
                cellHover && cellHover.x === row && cellHover.y === col
                  ? '0 0 8px rgba(196, 175, 138, 0.5)'
                  : cellColor !== '#F8F5F0'
                    ? '0 0 4px ' + cellColor + '40'
                    : 'none',
            }}
            onClick={() => {
              setCoordinates({ x: row, y: col });
              handleCellClick(row, col);
            }}
            onMouseEnter={() => setCellHover({ x: row, y: col })}
            onMouseLeave={() => setCellHover(null)}
          ></div>,
        );
      }
    }

    return gridCells;
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-[800px] flex-wrap overflow-hidden rounded-lg border border-[rgba(196,175,138,0.3)] bg-[#F8F5F0] shadow-[0_0_20px_rgba(196,175,138,0.15)]'>
        {generateGridCells()}
      </div>
    </div>
  );
}

export default Canvas;
