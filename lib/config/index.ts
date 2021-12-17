import dotenv from 'dotenv'
import sample from 'lodash/sample'

const envFound = dotenv.config()
if (envFound.error) {
  throw new Error("Couldn't find .env file")
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const DEFAULT_PORT = '5000'

const config = {
  https: {
    port: parseInt(process.env.PORT || DEFAULT_PORT, 10),
    cert: './cert/cert.pem',
    key: './cert/key.pem',
  },

  databaseUrl: process.env.MONGODB_URI,

  rpcUrls: [process.env.RPC_URL1, process.env.RPC_URL2, process.env.RPC_URL3],

  privateKey: process.env.PRIVATE_KEY,

  orderBook: process.env.ORDERBOOK_ADDRESS,

  settlement: process.env.SETTLEMENT_ADDRESS,
}

export const getRpcUrl = () => {
  const rpcUrl = sample(config.rpcUrls)
  console.log('rpcUrl=', rpcUrl)
  return rpcUrl
}

export default config
