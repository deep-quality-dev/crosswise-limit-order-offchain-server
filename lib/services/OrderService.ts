import { Contract } from '@ethersproject/contracts'
import config from '../config'
import OrderBookAbi from '../abis/OrderBook.json'
import Providers from '../Providers'
import Order from '../types/Order'

export class OrderService {
  constructor(
    private orderbook: Contract = new Contract(
      config.orderBook,
      OrderBookAbi,
      Providers.Testnet.provider
    )
  ) {}

  public createOrder = async (
    order: Order
  ): Promise<{
    success: boolean
    message?: string
  }> => {
    try {
      await this.orderbook.createOrder(order)
      return { success: true }
    } catch (err) {
      console.error(err.message)
      return { success: false, message: error?.data?.message ?? error.message }
    }
  }
}
