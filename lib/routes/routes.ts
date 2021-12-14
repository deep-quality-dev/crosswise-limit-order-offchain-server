import { CreateOrderController } from '../controllers/CreateOrderController'
import { ListOrderController } from '../controllers/ListOrderController'

export class Routes {
  public createOrderController: CreateOrderController =
    new CreateOrderController()

  public listOrderController: ListOrderController = new ListOrderController()

  public routes(app): void {
    app.post('/orders/create', this.createOrderController.createOrder)

    app.get('/orders/pending/:address', this.listOrderController.pendingOrders)

    app.get(
      '/orders/executed/:address',
      this.listOrderController.executedOrders
    )
  }
}
