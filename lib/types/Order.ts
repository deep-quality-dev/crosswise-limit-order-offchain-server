import { BigNumber } from '@ethersproject/bignumber'

export type IOrder = {
  hash: string
  maker: string
  fromToken: string
  toToken: string
  amountIn: string
  amountOutMin: string
  recipient: string
  deadline: number
  v: number
  r: string
  s: string
}

export type BigOrder = {
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
}

export enum OrderState {
  pending = 'pending',
  failed = 'failed',
  executed = 'executed',
  canceled = 'canceled',
}
