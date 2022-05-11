# ERC721 contracts for testing

## Usage

1. Clone the repository with `git clone git@github.com:BigWhaleLabs/simple-erc721.git`
2. Install the dependencies with `yarn`
3. Add environment vareables to your `.env` file
4. Run the scripts below

## Environment variables

| Name                         | Description                       |
| ---------------------------- | --------------------------------- |
| `ETHERSCAN_API_KEY`          | Etherscan API key                 |
| `RPC_URL`                    | RPC URL                           |
| `CONTRACT_OWNER_PRIVATE_KEY` | Private key of the contract owner |

Also check out the `.env.example` file for more information.

## Available scripts

- `yarn compile` — compiles the contract ts interface to the `typechain` directory
- `yarn deploy` — deploys the contracts to the network
- `yarn eth-lint` — runs the linter for the solidity contract
- `yarn lint` — runs all the linters
- `yarn prettify` — prettifies the code in th project
