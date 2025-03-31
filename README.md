# EspressoPlace

<div align="center">
  <h2>Smart Contracts</h2>
  <p>
    <strong>View our smart contracts implementation:</strong><br />
    <a href="https://github.com/rahulrajsarma/EspressoPlace-contracts">github.com/rahulrajsarma/EspressoPlace-contracts</a>
  </p>
  <p><em>Implementation for both Arbitrum Sepolia and EspressoPlace Chain</em></p>
</div>

A decentralized pixel canvas application built on the EspressoPlace Chain (ID: 4406) and Arbitrum Sepolia. Create your digital masterpiece in this cozy virtual space.

<div align="center">
  <img src="public/images/Demo Image.png" alt="EspressoPlace Demo" width="800" />
  <p><em>Interactive pixel canvas on EspressoPlace Chain</em></p>
</div>

## Espresso Chain Details

The application is built on the Espresso Chain, a Layer 2 blockchain that provides fast and secure transactions.

- **Chain Name**: EspressoPlace
- **Chain ID**: 4406
- **RPC URL**: http://51.20.141.87:8547

## Features

- 🎨 Interactive pixel canvas (100x200 pixels)
- 🌐 Cross-chain functionality between Arbitrum Sepolia and EspressoPlace Chain
- 🖱️ Drag and zoom interface for easy navigation
- 🎯 Color palette with 10 predefined colors
- 🔄 Real-time blockchain updates
- 💼 Wallet integration with wagmi
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**:
  - Arbitrum Sepolia
  - EspressoPlace Chain (ID: 4406)
- **Web3**:
  - wagmi
  - viem
- **State Management**: React Query
- **Testing**: Jest
- **Code Quality**:
  - ESLint
  - Prettier
  - Husky
  - Commitlint

## Prerequisites

- Node.js (version specified in `.nvmrc`)
- pnpm (recommended) or npm
- MetaMask or another Web3 wallet
- Access to Arbitrum Sepolia and EspressoPlace Chain

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd client
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in the required environment variables in `.env.local`.

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint issues
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm test` - Run tests
- `pnpm format` - Format code with Prettier

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── config/          # Configuration files
├── constant/        # Constants and ABIs
├── context/         # React context providers
├── lib/             # Utility functions
├── services/        # API and blockchain services
├── styles/          # Global styles
└── __tests__/       # Test files
```

## Blockchain Integration

The application supports two chains:

1. **Arbitrum Sepolia** (Chain ID: 421614)
2. **EspressoPlace Chain** (Chain ID: 4406)

When placing pixels on Arbitrum Sepolia, they are automatically synchronized to the EspressoPlace Chain.
