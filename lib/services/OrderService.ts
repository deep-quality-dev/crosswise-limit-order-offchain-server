import { Contract } from '@ethersproject/contracts'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'
import config from '../config'
import OrderBookAbi from '../abis/OrderBook.json'
import Providers from '../providers'
import { IOrder } from '../types/order'
import { callWithEstimateGas } from '../types/estimateGas'

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
      const tx: TransactionResponse = await callWithEstimateGas(
        orderbook,
        'createOrder',
        [order],
        1200
      )
      const receipt: TransactionReceipt = await tx.wait()
      return { success: receipt.status > 0 ? true : false }

      // const tx = await orderbook.createOrder(order)
      // const receipt: TransactionReceipt = await tx.wait()
      // return { success: receipt.status }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error?.message)
      return { success: false, message: error?.data?.message ?? error.message }
    }
  }
}
