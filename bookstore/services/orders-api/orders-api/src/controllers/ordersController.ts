import { Get, Route, Tags } from 'tsoa';

@Route("orders")
@Tags("Orders")
export class OrderController {
  @Get("/")
  public async getAllOrders(): Promise<any> {
    return [
      { orderId: 1, productName: "Book", quantity: 3 },
      { orderId: 2, productName: "Laptop", quantity: 1 }
    ];
  }
}
