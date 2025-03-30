import { defineChain } from '@reown/appkit/networks';

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
      http: ['http://51.20.141.87:8547'],
    },
  },
  blockExplorers: {
    default: {
      name: 'EspressoPlace Explorer',
      url: 'http://51.20.141.87:8547', // You might want to update this if there's a block explorer URL
    },
  },
});
