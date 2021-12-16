import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import HttpStatusCodes from 'http-status-codes'
import { OrderService } from '../services/OrderService'
import OrderModel, { IOrder } from '../models/Order'
import BigOrder, { OrderState } from '../types/Order'
import { transformOrder, hashOrder } from '../types/helpers'

export class CreateOrderController {
  constructor(private orderService: OrderService = new OrderService()) {}

  public createOrder = async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ errors: errors.array() })
    }

    const param = req.body

    const order: IOrder = {
      hash: param.hash.toString(),
      maker: param.maker.toString(),
      fromToken: param.fromToken.toString(),
      toToken: param.toToken.toString(),
      amountIn: param.amountIn.toString(),
      amountOutMin: param.amountOutMin.toString(),
      recipient: param.recipient.toString(),
      deadline: Number(param.deadline),
      v: Number(param.v),
      r: param.r.toString(),
      s: param.s.toString(),
      state: OrderState.pending,
    }

    const bigOrder: BigOrder = transformOrder(order)
    bigOrder.hash = hashOrder(bigOrder)

    if (order.hash === bigOrder.hash) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: 'Hash not matched',
          },
        ],
      })
    }

    try {
      const existOrder: IOrder = await OrderModel.findOne({
        hash: order.hash,
      })
      if (existOrder) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [
            {
              msg: 'Order already registered',
            },
          ],
        })
      }

      const { success } = await this.orderService.createOrder(bigOrder)
      if (success) {
        const newOrder = new OrderModel(order)
        await newOrder.save()

        return res.json({
          hash: newOrder.hash,
        })
      }

      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        errors: [
          {
            msg: 'Failed to place Limit Order',
          },
        ],
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message)
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send('Server Error')
    }
  }
}
