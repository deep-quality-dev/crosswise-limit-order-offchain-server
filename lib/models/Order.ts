import { Document, model, Schema } from 'mongoose'

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

const orderSchema: Schema = new Schema({
  hash: {
    type: String,
    required: true,
    unique: true,
  },
  maker: {
    type: String,
    required: true,
  },
  fromToken: {
    type: String,
    required: true,
  },
  toToken: {
    type: String,
    required: false,
  },
  amountIn: {
    type: String,
    required: true,
  },
  amountOutMin: {
    type: String,
    required: false,
  },
  recipient: {
    type: String,
    required: true,
  },
  deadline: {
    type: Number,
    required: true,
  },
  v: {
    type: Number,
    required: true,
  },
  r: {
    type: String,
    required: true,
  },
  s: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

export default model<IOrder & Document>('Orders', orderSchema)
