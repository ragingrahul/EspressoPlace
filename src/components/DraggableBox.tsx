import React, { useState } from 'react';
import Canvas from './Canvas';

function DraggableBox() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

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
    <div>
      <div
        className='relative'
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        }}
        onMouseDown={handleMouseDown}
        onWheel={handleWheel}
      >
        <Canvas />
      </div>
    </div>
  );
}

export default DraggableBox;
