import { Contract } from '@ethersproject/contracts'
import config from '../config'
import OrderBookAbi from '../abis/OrderBook.json'
import Providers from '../Providers'
import { IOrder } from 'models/Order'

export class OrderService {
  constructor() {}

  public createOrder = async (
    order: IOrder
  ): Promise<{
    success: boolean
    message?: string
  }> => {
    try {
      const orderbook: Contract = new Contract(
        config.orderBook,
        OrderBookAbi,
        Providers.Testnet.wallet
      )
      const tx = await orderbook.createOrder(order)
      const receipt = await tx.wait()
      return { success: receipt.status }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error?.message)
      return { success: false, message: error?.data?.message ?? error.message }
    }
  }
}
