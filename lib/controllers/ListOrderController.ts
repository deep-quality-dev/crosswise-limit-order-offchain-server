import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'
import OrderModel from '../models/order'
import { IOrder } from '../types/order'

export class ListOrderController {
  public async listOrders(req: Request, res: Response) {
    const state = req.params.state
    const address = req.params.address

    try {
      const orders: IOrder[] = await OrderModel.find({
        maker: address,
        state: state,
      })
      res.json(orders)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message)
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
    }
  }
}
