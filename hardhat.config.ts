import * as dotenv from 'dotenv'
import { cleanEnv, str } from 'envalid'
import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'

dotenv.config()

const { CONTRACT_OWNER_PRIVATE_KEY, RPC_URL, ETHERSCAN_API_KEY } = cleanEnv(
  process.env,
  {
    CONTRACT_OWNER_PRIVATE_KEY: str(),
    RPC_URL: str(),
    ETHERSCAN_API_KEY: str(),
  }
)

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    deploy: {
      url: RPC_URL,
      accounts: [CONTRACT_OWNER_PRIVATE_KEY],
    },
    local: {
      url: 'http://127.0.0.1:8545',
      accounts: [], // accounts private keys generated by the local node
    },
  },
  gasReporter: {
    enabled: true,
    currency: 'ETH',
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechain',
  },
}

export default config
