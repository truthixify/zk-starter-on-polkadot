# ZK Starter on Polkadot

This project demonstrates how to build and deploy zero-knowledge (ZK) applications on Polkadot using Hardhat. It includes smart contracts for anonymous transactions and verification, along with the necessary tooling for development and testing.

## Features

-   Zero-knowledge proof integration using circomlib and snarkjs
-   Smart contracts for anonymous transactions and verification
-   Hardhat development environment with Polkadot integration
-   Testing and deployment scripts
-   Support for both local development and Polkadot network deployment
-   Multiple network support (passetHub, Sepolia, localNode)

## Prerequisites

-   Node.js (v16 or later)
-   Yarn package manager
-   Polkadot development environment
-   eth-rpc-adapter binary
-   Polkadot node binary

## Environment Setup

1. Create a `.env` file in the root directory with the following variables:

```env
PRIVATE_KEY=your_private_key_here
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/truthixify/zk-starter-on-polkadot
cd zk-starter-on-polkadot
```

2. Install dependencies:

```bash
yarn install
```

3. Set up the required binaries:
    - Create a binary of the [`eth-rpc-adapter`](https://github.com/paritytech/polkadot-sdk/tree/master/substrate/frame/revive/rpc)
    - Move it to the `bin` folder at the root of your project
    - Set up the Polkadot node binary
    - Update the paths in `hardhat.config.js` to point to your local binaries:
        ```js
        nodeBinaryPath: '/path/to/polkadot/node/binary'
        adapterBinaryPath: '/path/to/eth-rpc-adapter/binary'
        ```

## Project Structure

```
├── contracts/           # Smart contracts
│   ├── Anon.sol         # Anonymous transaction contract
│   └── Verifier.sol     # ZK proof verification contract
├── circuits/            # Zero-knowledge circuits
│   ├── Anon.circom      # Circuit for anonymous hash validation
│   ├── build/           # Compiled circuit artifacts
│   └── *.json           # Circuit inputs and outputs
├── scripts/             # Deployment and interaction scripts
├── test/                # Test files
└── ignition/            # Deployment modules
```

## Project Components

### Zero-Knowledge Circuits

The project implements a zero-knowledge proof system using Circom:

-   `Anon.circom`: Implements a Poseidon hash-based validation circuit that:
    -   Takes a secret input and its hash
    -   Verifies that the hash matches the secret using the Poseidon hash function
    -   Generates a zero-knowledge proof of this verification

### Smart Contracts

The project includes two main smart contracts:

-   `Anon.sol`: The main contract that:

    -   Manages user commitments (hashed secrets)
    -   Allows users to commit their hashed secrets
    -   Verifies zero-knowledge proofs
    -   Emits events for commitment and proof verification

-   `Verifier.sol`: A contract that:
    -   Implements the verification logic for zero-knowledge proofs
    -   Verifies the mathematical correctness of the proofs
    -   Ensures the integrity of the anonymous transaction system

## Available Scripts

-   `yarn format`: Format code using Prettier
-   `yarn test`: Run tests on local node
-   `yarn compile`: Compile smart contracts
-   `yarn deploy:passetHub`: Deploy to passetHub network
-   `yarn deploy:localNode`: Deploy to local node
-   `yarn interact:commit`: Run commit interaction script
-   `yarn interact:prove`: Run prove interaction script

## Network Configuration

The project supports multiple networks:

-   `hardhat`: Local development network with Polkadot VM
-   `localNode`: Local node for testing
-   `passetHub`: Polkadot Asset Hub testnet
-   `sepolia`: Ethereum Sepolia testnet

## Development

1. Start a local node:

```bash
npx hardhat node
```

2. Deploy contracts to local node:

```bash
yarn deploy:localNode
```

3. Run tests:

```bash
yarn test
```

## Compiler Settings

The project uses:

-   Solidity version: 0.8.28
-   Optimizer enabled with 200 runs
-   Polkadot VM support

## Dependencies

-   circomlib: ^2.0.5
-   circomlibjs: ^0.1.7
-   snarkjs: ^0.7.5
-   hardhat: ^2.24.2
-   @parity/hardhat-polkadot: ^0.1.6
-   dotenv: ^16.5.0

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Useful Links

-   [Polkadot Hardhat Documentation](https://papermoonio.github.io/polkadot-mkdocs/tutorials/smart-contracts/launch-your-first-project/test-and-deploy-with-hardhat/) - Comprehensive guide for testing and deploying smart contracts with Hardhat on Polkadot
