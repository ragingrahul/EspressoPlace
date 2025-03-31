// Mock contractService
export const placePixel = jest
  .fn()
  .mockImplementation(() => Promise.resolve(true));
export const getCanvas = jest
  .fn()
  .mockImplementation(() => Promise.resolve(Array(200).fill('')));
