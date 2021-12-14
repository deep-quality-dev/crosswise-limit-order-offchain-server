import { JsonRpcProvider } from '@ethersproject/providers'
import 'dotenv/config'
import { Wallet } from '@ethersproject/wallet'
import config, { getRpcUrl } from './config'

class Providers {
  provider: JsonRpcProvider
  wallet: Wallet

  static Testnet = new Providers(97, getRpcUrl(), config.privateKey)

  private constructor(chainId: number, rpcUrl: string, privateKey: string) {
    this.provider = new JsonRpcProvider(rpcUrl)
    this.wallet = new Wallet(privateKey, this.provider)
  }
}

export default Providers
