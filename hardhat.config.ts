import { HardhatUserConfig } from 'hardhat/config';
import * as dotenv from 'dotenv';
import '@nomicfoundation/hardhat-toolbox';
import 'hardhat-deploy';

dotenv.config();

const pkeys = process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 5,
      },
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    localhost: {
      live: false,
      saveDeployments: true,
      tags: ['local'],
    },
    goerli: {
      url: process.env.GOERLI_URL ?? '',
      accounts: pkeys,
      verify: {
        etherscan: {
          apiKey: process.env.ETHERSCAN_API_KEY as string,
        },
      },
    },
    mumbai: {
      url: process.env.MUMBAI_URL ?? '',
      accounts: pkeys,
      verify: {
        etherscan: {
          apiUrl: 'https://api-testnet.polygonscan.com/',
          apiKey: process.env.POLYGON_API_KEY as string,
        },
      },
    },
    bsc: {
      url: process.env.BSC_TESTNET_URL ?? '',
      accounts: pkeys,
    },
    hardhat: {
      forking: {
        url: `${process.env.PROVIDER_FORKING}`,
        blockNumber: 15932058,
      },
    },
  },
};

export default config;
