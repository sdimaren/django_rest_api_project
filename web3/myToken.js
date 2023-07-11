// Import Alchemy and your contracts ABI
import { Alchemy, Network } from 'alchemy-sdk'
import 'dotenv/config'

// Grab your API key, contract addy, and wallet addy put them into .env
const alchemyAPIKey = process.env.ALCHEMY_API_KEY
const contractAddress = process.env.CONTRACT_ADDRESS
const walletAddress = process.env.WALLET_ADDRESS

console.log(alchemyAPIKey)
console.log(contractAddress)
console.log(walletAddress)

// Create a function to fetch your contract
async function queryERC20Contract() {
    //Connect to Alchemy

    //Use the Token API to get token balances
    const settings = {
      apiKey: alchemyAPIKey,
      network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(settings);

  const latestBlock = alchemy.core.getBlock("latest").then(console.log);


}
// Run your function, and catch any errors

console.log(queryERC20Contract())

// Comment the output here:
// address: '',
//     tokenBalances: [
//         {
//             contractAddress: '',
//             tokenBalance: ''
//         }
//     ]
// }