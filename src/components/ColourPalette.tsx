import { Dispatch, SetStateAction, useState } from 'react';

type ColorOptions = {
  red: string;
  orange: string;
  yellow: string;
  green: string;
  blue: string;
  purple: string;
  cyan: string;
  magenta: string;
  white: string;
  black: string;
};

type Props = {
  colorOptions: ColorOptions;
  coordinates: { x: number; y: number };
  setSelectedColor: Dispatch<SetStateAction<string>>;
};

function ColourPalette({ colorOptions, setSelectedColor, coordinates }: Props) {
  const [activeColor, setActiveColor] = useState<string>('#FF3D3D');

  const handleColorSelect = (colorCode: string) => {
    setSelectedColor(colorCode);
    setActiveColor(colorCode);
  };

  return (
    <div className='relative z-10 rounded-lg border border-[rgba(196,175,138,0.3)] bg-[rgba(248,245,240,0.75)] px-6 py-4 shadow-[0_0_20px_rgba(196,175,138,0.15)] backdrop-blur-md'>
      <div className='mb-4 flex items-center space-x-4'>
        <div
          className='h-8 w-8 rounded-full'
          style={{
            backgroundColor: activeColor,
            boxShadow: `0 0 10px ${activeColor}40`,
          }}
        ></div>
        <div className='text-xs text-[#5d4422]/80'>
          <p>
            Position: ({coordinates.x}, {coordinates.y})
          </p>
        </div>
      </div>

      <div className='flex flex-wrap justify-center gap-2'>
        {Object.entries(colorOptions).map(([colorName, colorCode]) => (
          <button
            key={colorName}
            style={{
              backgroundColor: colorCode,
              boxShadow:
                activeColor === colorCode ? `0 0 8px ${colorCode}80` : 'none',
              transform: activeColor === colorCode ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={() => handleColorSelect(colorCode)}
            className='h-8 w-8 rounded-full transition-all duration-200 hover:scale-110'
            title={colorName}
          ></button>
        ))}
      </div>
    </div>
  );
}

export default ColourPalette;
