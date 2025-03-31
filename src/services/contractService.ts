import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { getPublicClient, getWalletClient } from 'wagmi/actions';

import { config } from '@/config';
import { espressoPlace } from '@/config/espressoplace';
import EspressoPlaceABI from '@/constant/EspressoPlace.json';

const CONTRACT_ADDRESSES = {
  // Arbitrum Sepolia
  421614: '0x797d5e7341d89a94dAB62F63d58C8C9263D4DcE1' as const,
  // EspressoPlace chain
  4406: '0xC1a1EB934a1f24375c89E23A97caFdA5Fb402a95' as const,
};

const abi = EspressoPlaceABI.abi;

export const CHAIN_NAMES = {
  421614: 'Arbitrum Sepolia',
  4406: 'EspressoPlace',
};

const getContractAddress = (chainId: number): `0x${string}` => {
  return (CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] ||
    CONTRACT_ADDRESSES[421614]) as `0x${string}`;
};

export const placePixel = async (x: number, y: number, color: string) => {
  try {
    const walletClient = await getWalletClient(config);

    if (!walletClient) {
      throw new Error('Wallet not connected');
    }

    const chainId = walletClient.chain.id;
    const contractAddress = getContractAddress(chainId);
    const account = walletClient.account.address;

    if (chainId === 421614) {
      const placeStruct = {
        placer: account,
        x: x,
        y: y,
        color: color,
      };

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi,
        functionName: 'place',
        args: [placeStruct], // Pass the struct as a single argument
      });

      const publicClient = await getPublicClient(config);
      if (!publicClient) {
        throw new Error('Public client not available');
      }

      const receipt = await publicClient.waitForTransactionReceipt({ hash });

      if (receipt.status === 'success') {
        await placePixelOnSecondaryChain(x, y, color);
      }

      return receipt.status === 'success';
    } else {
      const placeStruct = {
        placer: account,
        x: x,
        y: y,
        color: color,
      };

      const hash = await walletClient.writeContract({
        address: contractAddress,
        abi,
        functionName: 'place',
        args: [placeStruct], // Pass the struct as a single argument
      });

      const publicClient = await getPublicClient(config);
      if (!publicClient) {
        throw new Error('Public client not available');
      }

      const receipt = await publicClient.waitForTransactionReceipt({ hash });
      return receipt.status === 'success';
    }
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Error placing pixel:', error);
    throw error;
  }
};

const placePixelOnSecondaryChain = async (
  x: number,
  y: number,
  color: string,
) => {
  try {
    if (!process.env.NEXT_PUBLIC_SECONDARY_CHAIN_PRIVATE_KEY) {
      //eslint-disable-next-line no-console
      console.error('Secondary chain private key not found or invalid');
      return false;
    }

    //eslint-disable-next-line no-console
    console.log('Starting cross-chain transaction to EspressoPlace (4406)');

    const account = privateKeyToAccount(
      process.env.NEXT_PUBLIC_SECONDARY_CHAIN_PRIVATE_KEY as `0x${string}`,
    );

    const placeStruct = {
      placer: account.address,
      x: x,
      y: y,
      color: color,
    };

    //eslint-disable-next-line no-console
    console.log(
      'Creating wallet client for EspressoPlace chain',
      espressoPlace,
    );

    // Create a wallet client for the EspressoPlace chain
    const secondaryWalletClient = createWalletClient({
      account,
      chain: espressoPlace,
      transport: http(),
    });

    const contractAddress = getContractAddress(4406);

    //eslint-disable-next-line no-console
    console.log(
      'Sending transaction to EspressoPlace contract at',
      contractAddress,
    );

    //eslint-disable-next-line no-console
    console.log('PlaceStruct:', placeStruct);

    // Call the place method on the secondary chain
    const hash = await secondaryWalletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: 'place',
      args: [placeStruct], // Pass the struct as a single argument
    });

    //eslint-disable-next-line no-console
    console.log('Secondary chain transaction sent:', hash);

    const espressoPublicClient = createPublicClient({
      chain: espressoPlace,
      transport: http(),
    });

    //eslint-disable-next-line no-console
    console.log('Waiting for transaction confirmation on EspressoPlace chain');

    const receipt = await espressoPublicClient.waitForTransactionReceipt({
      hash,
    });

    //eslint-disable-next-line no-console
    console.log('Secondary chain transaction confirmed:', receipt.status);

    return receipt.status === 'success';
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Error placing pixel on secondary chain:', error);
    // Log detailed error information
    if (error instanceof Error) {
      //eslint-disable-next-line no-console
      console.error('Error details:', error.message);
    }
    return false;
  }
};

export const getCanvas = async (x: number) => {
  try {
    const publicClient = await getPublicClient(config);

    if (!publicClient) {
      throw new Error('Public client not available');
    }

    const chainId = publicClient.chain.id;

    const contractAddress = getContractAddress(4406);

    if (chainId !== 4406) {
      const chain4406Client = createPublicClient({
        chain: espressoPlace,
        transport: http(),
      });

      return chain4406Client.readContract({
        address: contractAddress,
        abi,
        functionName: 'getCanvas',
        args: [x],
      });
    }

    return publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: 'getCanvas',
      args: [x],
    });
  } catch (error) {
    //eslint-disable-next-line no-console
    console.error('Error getting canvas data:', error);
    throw error;
  }
};
