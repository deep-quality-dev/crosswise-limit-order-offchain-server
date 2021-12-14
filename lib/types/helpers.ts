import { BigNumber } from '@ethersproject/bignumber'
import Order, { OrderState } from './Order'
import { IOrder } from '../models/Order'

export const transformOrder = (order: IOrder): Order => {
  return {
    hash: order.hash,
    maker: order.maker,
    fromToken: order.fromToken,
    toToken: order.toToken,
    amountIn: BigNumber.from(order.amountIn),
    amountOutMin: BigNumber.from(order.amountIn),
    recipient: order.receipt,
    deadline: BigNumber.from(order.deadline),
    v: BigNumber.from(order.v),
    r: order.r,
    s: order.s,
    state: order.state as OrderState,
  }
}
