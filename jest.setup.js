/* global jest */
import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock wagmi hooks
jest.mock('wagmi', () => ({
  useAccount: () => ({
    isConnected: false,
    address: undefined,
  }),
  useNetwork: () => ({
    chain: undefined,
    chains: [],
  }),
  useSwitchNetwork: () => ({
    switchNetwork: jest.fn(),
  }),
  useConnect: () => ({
    connect: jest.fn(),
    connectors: [],
  }),
  useDisconnect: () => ({
    disconnect: jest.fn(),
  }),
}));

// Mock contractService
jest.mock('@/services/contractService', () => ({
  placePixel: jest.fn().mockResolvedValue(true),
  getCanvas: jest.fn().mockResolvedValue(Array(200).fill('')),
}));
