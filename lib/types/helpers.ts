import { defaultAbiCoder } from '@ethersproject/abi'
import { BigNumber } from '@ethersproject/bignumber'
import { keccak256 } from '@ethersproject/keccak256'
import Order, { OrderState } from './Order'
import { IOrder } from '../models/Order'

const ORDER_TYPEHASH =
  '0x7c228c78bd055996a44b5046fb56fa7c28c66bce92d9dc584f742b2cd76a140f'

export const transformOrder = (order: IOrder): Order => {
  return {
    hash: order.hash,
    maker: order.maker,
    fromToken: order.fromToken,
    toToken: order.toToken,
    amountIn: BigNumber.from(order.amountIn),
    amountOutMin: BigNumber.from(order.amountIn),
    recipient: order.recipient,
    deadline: BigNumber.from(order.deadline),
    v: BigNumber.from(order.v),
    r: order.r,
    s: order.s,
    state: order.state as OrderState,
  }
}

export const hashOrder = (order: Order): string => {
  return keccak256(
    defaultAbiCoder.encode(
      [
        'bytes32',
        'address',
        'address',
        'address',
        'uint256',
        'uint256',
        'address',
        'uint256',
      ],
      [
        ORDER_TYPEHASH,
        order.maker,
        order.fromToken,
        order.toToken,
        order.amountIn,
        order.amountOutMin,
        order.recipient,
        order.deadline,
      ]
    )
  )
}

export const localToUTC = (date: number): Date => {
  const now = new Date()
  return new Date(date + now.getTimezoneOffset() * 60000)
}
