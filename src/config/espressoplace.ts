import { defineChain } from '@reown/appkit/networks';

// Use Next.js rewrite instead of API route
const proxyRpcUrl = '/api/rpc';

export const espressoPlace = defineChain({
  id: 4406,
  caipNetworkId: 'eip155:4406',
  chainNamespace: 'eip155',
  name: 'EspressoPlace',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: [proxyRpcUrl],
    },
    public: {
      http: [proxyRpcUrl],
    },
  },
  blockExplorers: {
    default: {
      name: 'EspressoPlace Explorer',
      url: 'http://51.20.141.87:8547',
    },
  },
});
