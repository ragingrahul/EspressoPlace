import { getPublicClient, getWalletClient } from 'wagmi/actions';

import { config } from '@/config';
import EspressoPlaceABI from '@/constant/EspressoPlace.json';

// Contract address - IMPORTANT: Replace with the actual deployed contract address
const CONTRACT_ADDRESS = '0xC1a1EB934a1f24375c89E23A97caFdA5Fb402a95'; // Replace with the actual EspressoPlace contract address

// Parse the ABI from the JSON file
const abi = EspressoPlaceABI.abi;

export async function placePixel(x: number, y: number, color: string) {
  const walletClient = await getWalletClient(config);

  if (!walletClient) {
    throw new Error('Wallet not connected');
  }
  const [address] = await walletClient.getAddresses();

  const placeStruct = {
    placer: address,
    x: x,
    y: y,
    color: color,
  };

  const hash = await walletClient.writeContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: 'place',
    args: [placeStruct],
  });

  return hash;
}

export async function getCanvas(x: number) {
  const publicClient = getPublicClient(config);

  if (!publicClient) {
    throw new Error('Public client not available');
  }

  const data = await publicClient.readContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi,
    functionName: 'getCanvas',
    args: [x],
  });

  return data;
}
