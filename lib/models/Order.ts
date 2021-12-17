import { Document, model, Schema } from 'mongoose'
import { IOrder } from '../types/order'

export interface IOrderDocument extends IOrder, Document {
  state: string
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

export default model<IOrderDocument>('Orders', orderSchema)
