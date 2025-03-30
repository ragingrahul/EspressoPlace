// config/index.tsx

import { arbitrum, mainnet, sepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { cookieStorage, createStorage, http } from 'wagmi';

import { espressoPlace } from './espressoplace';

// Get projectId from https://cloud.reown.com
export const projectId = 'b1df1113461984dbb0be3d8b9c74c388';

if (!projectId) {
  throw new Error('Project ID is not defined');
}

export const networks = [espressoPlace, mainnet, arbitrum, sepolia];

// Get the RPC URL from the chain configuration
const espressoRpcUrl = espressoPlace.rpcUrls.default.http[0];

// Set up the HTTP transport with the proxied URL
const customHttpTransport = http(espressoRpcUrl);

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [espressoPlace.id]: customHttpTransport,
  },
});

export const config = wagmiAdapter.wagmiConfig;
