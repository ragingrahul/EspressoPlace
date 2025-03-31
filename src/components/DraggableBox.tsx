import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAccount } from 'wagmi';

import { CHAIN_NAMES, getCanvas, placePixel } from '@/services/contractService';

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

const getColorFromHex = (hex: string) => {
  if (!hex.startsWith('#')) {
    hex = '#' + hex;
  }
  for (const [colorCode] of Object.entries(colorOptions)) {
    if (colorCode.toLowerCase() === hex.toLowerCase()) {
      return colorCode;
    }
  }
  return hex;
};

function DraggableBox() {
  const { isConnected, address, chainId } = useAccount();
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
  const [isPlacing, setIsPlacing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Load canvas data when component mounts
  useEffect(() => {
    async function loadCanvasData() {
      try {
        setIsLoading(true);
        setLoadingProgress(0);

        // Create an array of promises for parallel loading
        const loadPromises = Array.from({ length: 100 }, async (_, x) => {
          try {
            const columnData = await getCanvas(x);
            return { x, data: columnData };
          } catch (err) {
            return { x, data: null };
          }
        });

        const BATCH_SIZE = 10;
        const newGridColors = [...gridColors];

        for (let i = 0; i < loadPromises.length; i += BATCH_SIZE) {
          const batch = loadPromises.slice(i, i + BATCH_SIZE);
          const results = await Promise.all(batch);

          results.forEach(({ x, data }) => {
            if (data && Array.isArray(data)) {
              for (let y = 0; y < data.length && y < 200; y++) {
                if (data[y] && data[y] !== '') {
                  newGridColors[x][y] = getColorFromHex(data[y]);
                }
              }
            }
          });

          // Update progress
          setLoadingProgress(
            Math.min(
              100,
              Math.round(((i + BATCH_SIZE) / loadPromises.length) * 100),
            ),
          );
        }

        setGridColors(newGridColors);
        toast.success('Canvas loaded from blockchain');
      } catch (error) {
        toast.error('Failed to load canvas from blockchain');
      } finally {
        setIsLoading(false);
        setLoadingProgress(0);
      }
    }

    loadCanvasData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick = async (x: number, y: number) => {
    if (isPlacing) return;

    const newGridColors = [...gridColors];
    newGridColors[x][y] = selectedColor;
    setGridColors(newGridColors);

    if (!isConnected || !address) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (chainId !== 421614 && chainId !== 4406) {
      toast.error('Please switch to Arbitrum Sepolia or Chain 4406');
      return;
    }

    try {
      if (isPlacing) return;

      setIsPlacing(true);

      const colorHex = selectedColor.replace('#', '');

      await placePixel(x, y, colorHex);

      toast.success('Pixel placed on the blockchain!');
    } catch (error) {
      toast.error('Failed to place pixel on the blockchain');

      const revertedColors = [...gridColors];
      revertedColors[x][y] = '#F8F5F0'; // Revert to background color
      setGridColors(revertedColors);
    } finally {
      setIsPlacing(false);
    }
  };

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseDown = (e: any) => {
    const startX = e.clientX - position.x;
    const startY = e.clientY - position.y;

    //eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  //eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      {isLoading ? (
        <div className='flex h-[600px] items-center justify-center'>
          <div className='text-center text-[#5d4422]'>
            <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'></div>
            <p className='mt-4'>
              Loading canvas from blockchain... {loadingProgress}%
            </p>
            <div className='mt-2 h-2 w-[300px] overflow-hidden rounded-full bg-gray-200'>
              <div
                className='h-full bg-[#5d4422] transition-all duration-300 ease-out'
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      ) : (
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
      )}

      <div className='fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 transform items-center justify-center'>
        <ColorPalette
          colorOptions={colorOptions}
          coordinates={coordinates}
          setSelectedColor={setSelectedColor}
        />
      </div>

      {isPlacing && (
        <div className='fixed bottom-24 left-1/2 z-50 min-w-[300px] max-w-[400px] -translate-x-1/2 transform rounded-xl border-2 border-[#5d4422] bg-[#F8F5F0] p-4 shadow-lg backdrop-blur-sm'>
          <div className='flex items-center justify-center gap-3'>
            <div className='h-5 w-5 animate-spin rounded-full border-2 border-[#5d4422] border-t-transparent'></div>
            <p className='text-lg font-semibold text-[#5d4422]'>
              Placing pixel on{' '}
              {chainId
                ? CHAIN_NAMES[chainId as keyof typeof CHAIN_NAMES] ||
                  `Chain ${chainId}`
                : 'blockchain'}
              ...
            </p>
          </div>
          <div className='mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-200'>
            <div className='h-full animate-pulse rounded-full bg-[#5d4422]'></div>
          </div>
          {chainId === 421614 && (
            <p className='mt-2 text-center text-sm text-[#5d4422]'>
              Your pixel will also be placed on {CHAIN_NAMES[4406]}{' '}
              automatically
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default DraggableBox;
