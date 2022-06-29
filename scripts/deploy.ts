import { ethers, run } from 'hardhat'

async function main() {
  const [deployer] = await ethers.getSigners()
  // Deploy the contracts
  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())
  const provider = ethers.provider
  const { chainId } = await provider.getNetwork()
  const chains = {
    1: 'mainnet',
    3: 'ropsten',
    4: 'rinkeby',
    5: 'goerli',
  } as { [chainId: number]: string }
  const chainName = chains[chainId]
  const SimpleERC721 = await ethers.getContractFactory('SimpleERC721')
  const contracts = [
    { tokenName: 'StrawberryFrens', tokenSymbol: 'STRW' },
    { tokenName: 'BananaFrens', tokenSymbol: 'BANF' },
    { tokenName: 'OrangeFrens', tokenSymbol: 'ORNF' },
    { tokenName: 'AppleFrens', tokenSymbol: 'APLE' },
    { tokenName: 'GrapeFrens', tokenSymbol: 'GRPE' },
    { tokenName: 'PearFrens', tokenSymbol: 'PEAR' },
    { tokenName: 'CherryFrens', tokenSymbol: 'CHER' },
  ]
  const deployedContracts = [] as { tokenName: string; address: string }[]
  let firstTime = true
  for (const { tokenName, tokenSymbol } of contracts) {
    console.log(`Deploying ${tokenName}...`)
    const contract = await SimpleERC721.deploy(tokenName, tokenSymbol)
    console.log('Deploy tx gas price:', contract.deployTransaction.gasPrice)
    console.log('Deploy tx gas limit:', contract.deployTransaction.gasLimit)
    await contract.deployed()
    const address = contract.address
    console.log('Contract deployed to:', address)
    if (firstTime) {
      console.log('Wait for 1 minute to make sure blockchain is updated')
      await new Promise((resolve) => setTimeout(resolve, 60 * 1000))
      // Try to verify the contract on Etherscan
      console.log('Verifying contract on Etherscan')
      try {
        await run('verify:verify', {
          address,
          constructorArguments: [tokenName, tokenSymbol],
        })
      } catch (err) {
        console.log(
          'Error verifiying contract on Etherscan:',
          err instanceof Error ? err.message : err
        )
      }
      firstTime = false
    }
    // Print out the information
    console.log('Contract deployed and verified on Etherscan!')
    console.log('Contract address:', address)
    console.log(
      'Etherscan URL:',
      `https://${
        chainName !== 'mainnet' ? `${chainName}.` : ''
      }etherscan.io/address/${address}`
    )
    deployedContracts.push({ tokenName, address })
  }
  console.log('Deployed contracts:')
  deployedContracts.forEach(({ tokenName, address }) => {
    console.log(`${tokenName}: ${address}`)
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
