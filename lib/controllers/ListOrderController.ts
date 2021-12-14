import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'
import OrderModel, { IOrder } from '../models/Order'
import { OrderState } from '../types/Order'

export class ListOrderController {
  public async pendingOrders(req: Request, res: Response) {
    const address = req.params.address

    try {
      const orders: IOrder[] = await OrderModel.find({
        maker: address,
        state: OrderState.pending,
      })
      res.json(orders)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message)
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
    }
  }

  public async executedOrders(req: Request, res: Response) {
    const address = req.params.address

    try {
      const orders: IOrder[] = await OrderModel.find({
        maker: address,
        state: OrderState.executed,
      })
      res.json(orders)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message)
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
    }
  }
}
