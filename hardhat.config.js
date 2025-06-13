require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')
require('@parity/hardhat-polkadot')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.28',
    resolc: {
        version: '1.5.2',
        compilerSource: 'npm',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    networks: {
        hardhat: {
            polkavm: true,
            nodeConfig: {
                nodeBinaryPath: 'INSERT_PATH_TO_SUBSTRATE_NODE',
                rpcPort: 8000,
                dev: true
            },
            adapterConfig: {
                adapterBinaryPath: 'INSERT_PATH_TO_ETH_RPC_ADAPTER',
                dev: true
            }
        },
        localNode: {
            polkavm: true,
            url: `http://127.0.0.1:8545`
        },
        passetHub: {
            polkavm: true,
            url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
            accounts: [process.env.PRIVATE_KEY]
        },
        sepolia: {
            url: 'https://sepolia.infura.io/v3/5a352c10b52845a4a69084f69d767b2a',
            accounts: [process.env.PRIVATE_KEY]
        }
    }
}
