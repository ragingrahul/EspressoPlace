import React, { useState } from 'react';

import Canvas from './Canvas';
import ColorPalette from './ColourPalette';

const colorOptions = {
  red: '#FF3D3D',
  orange: '#FF9C41',
  yellow: '#FFE14C',
  green: '#4CFF73',
  blue: '#3D8BFF',
  purple: '#AD4CFF',
  cyan: '#20D2EF',
  magenta: '#FF3DB2',
  white: '#FFFFFF',
  black: '#000000',
};

function DraggableBox() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('#FF3D3D'); // Default to red
  const [coordinates, setCoordinates] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [gridColors, setGridColors] = useState<string[][]>(
    Array.from({ length: 100 }, () => new Array(200).fill('#F8F5F0')), // Beige background
  );

  const handleCellClick = (row: number, col: number) => {
    const updatedColors = [...gridColors];
    updatedColors[row][col] = selectedColor;
    setGridColors(updatedColors);
    console.log(row, col);
  };

  const handleMouseDown = (e: any) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    const handleMouseMove = (e: any) => {
      setPosition({
        x: e.clientX - startX,
        y: e.clientY - startY,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleWheel = (e: any) => {
    e.preventDefault();
    const newScale = Math.max(0.1, Math.min(scale + e.deltaY * -0.001, 3));
    setScale(newScale);
  };

  return (
    <div className='relative pt-10'>
      <div className='absolute left-1/2 top-0 mb-6 -translate-x-1/2 transform rounded-lg px-4 py-1 text-center text-[#5d4422]'>
        <p className='text-sm opacity-75'>
          Zoom with scroll wheel • Drag to move
        </p>
      </div>

      <div
        className='relative cursor-move'
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transition: 'transform 0.1s ease-out',
        }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <Canvas
          gridColors={gridColors}
          handleCellClick={handleCellClick}
          setCoordinates={setCoordinates}
        />
      </div>

      <div className='fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 transform items-center justify-center'>
        <ColorPalette
          colorOptions={colorOptions}
          coordinates={coordinates}
          setSelectedColor={setSelectedColor}
        />
      </div>
    </div>
  );
}

export default DraggableBox;
