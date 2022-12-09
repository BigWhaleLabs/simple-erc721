import * as dotenv from 'dotenv'
import { cleanEnv, str } from 'envalid'
import { HardhatUserConfig } from 'hardhat/config'
import { ETH_RPC as FALLBACK_ETH_RPC } from '@big-whale-labs/constants'
import '@nomiclabs/hardhat-etherscan'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'

dotenv.config()

const { CONTRACT_OWNER_PRIVATE_KEY, ETH_RPC, ETHERSCAN_API_KEY } = cleanEnv(
  process.env,
  {
    CONTRACT_OWNER_PRIVATE_KEY: str(),
    ETH_RPC: str({ default: FALLBACK_ETH_RPC }),
    ETHERSCAN_API_KEY: str(),
  }
)

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    deploy: {
      url: ETH_RPC,
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
