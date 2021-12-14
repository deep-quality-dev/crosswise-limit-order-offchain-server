import { BigNumber } from '@ethersproject/bignumber'

type Order = {
  hash: string
  maker: string
  fromToken: string
  toToken: string
  amountIn: BigNumber
  amountOutMin: BigNumber
  recipient: string
  deadline: BigNumber
  v: BigNumber
  r: string
  s: string
  state: OrderState
}

export enum OrderState {
  pending = 'pending',
  failed = 'failed',
  executed = 'executed',
  canceled = 'canceled',
}

export default Order
