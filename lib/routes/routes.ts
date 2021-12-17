import { isAddress } from '@ethersproject/address'
import { check, param } from 'express-validator'
import { CreateOrderController } from '../controllers/CreateOrderController'
import { ListOrderController } from '../controllers/ListOrderController'
import { localToUTC } from '../types/helpers'

export class Routes {
  public createOrderController: CreateOrderController =
    new CreateOrderController()

  public listOrderController: ListOrderController = new ListOrderController()

  public routes(app): void {
    app.post(
      '/orders/create',
      [
        check('hash').not().isEmpty(),
        check('maker').custom(maker => isAddress(maker)),
        check('fromToken').custom(fromToken => isAddress(fromToken)),
        check('toToken').custom(toToken => isAddress(toToken)),
        check('amountOutMin').exists().isString(),
        check('amountIn')
          .exists()
          .isString()
          .custom(
            (amountIn, { req }) =>
              amountIn.length >= req.body.amountOutMin.length
          ),
        check('recipient').custom(receipt => isAddress(receipt)),
        check('deadline').custom(
          deadline =>
            Number(deadline) >
            Math.floor(localToUTC(Date.now()).getTime() / 1000)
        ),
        check('v')
          .isNumeric()
          .custom(v => Number(v) > 0),
        check('r').not().isEmpty().isString(),
        check('s').not().isEmpty().isString(),
      ],
      this.createOrderController.createOrder
    )

    app.get(
      '/orders/:state/:address',
      [param('state').isIn(['pending', 'executed'])],
      [param('address').not().isEmpty().isString()],
      this.listOrderController.listOrders
    )
  }
}
