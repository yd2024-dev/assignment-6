var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BodyProp, Controller, Get, Path, Post, Put, Route, SuccessResponse, Request } from 'tsoa';
import { getBookInfo } from './get_book_info';
import { placeBooksOnShelf } from './place_on_shelf';
import { fulfilOrder } from './fulfil_order';
import { placeOrder } from './place_order';
import { listOrders } from './list_orders';
let WarehouseRoutes = class WarehouseRoutes extends Controller {
    /**
       * Find the shelves that have copies of the book, and how
       * many copies each shelf has
       * @param book The book's unique identifier!
       * @returns {BookInfo}
       */
    async getBookInfo(book, request) {
        const ctx = request.ctx;
        const data = ctx.state.warehouse;
        return await getBookInfo(data, book);
    }
    /**
     * Add copies of a book to a provided shelf
     * @param book The book's unique identifier
     * @param shelf The shelf's name
     * @param number The number of copies to place on the shelf
     */
    async placeBooksOnShelf(book, shelf, number, request) {
        const ctx = request.ctx;
        this.setStatus(201);
        await placeBooksOnShelf(ctx.state.warehouse, book, number, shelf);
    }
};
__decorate([
    Get('{book}'),
    __param(0, Path()),
    __param(1, Request())
], WarehouseRoutes.prototype, "getBookInfo", null);
__decorate([
    Put('{book}/{shelf}/{number}'),
    SuccessResponse(201, 'Added'),
    __param(0, Path()),
    __param(1, Path()),
    __param(2, Path()),
    __param(3, Request())
], WarehouseRoutes.prototype, "placeBooksOnShelf", null);
WarehouseRoutes = __decorate([
    Route('warehouse')
], WarehouseRoutes);
export { WarehouseRoutes };
let FulfilOrderRoutes = class FulfilOrderRoutes extends Controller {
    /**
       * Fulfil an order by taking all the relevant book copies for the order off the shelves
       * @param order The Order ID
       * @param booksFulfilled An array lsting how many copies of each book were taken from each shelf
       */
    async fulfilOrder(order, booksFulfilled, request) {
        const ctx = request.ctx;
        this.setStatus(201);
        try {
            await fulfilOrder(ctx.state.warehouse, order, booksFulfilled);
            this.setStatus(201);
        }
        catch (e) {
            this.setStatus(500);
            console.error('Error Fulfilling Order', e);
        }
    }
};
__decorate([
    Put('{order}'),
    SuccessResponse(201, 'Fulfilled'),
    __param(0, Path()),
    __param(1, BodyProp('booksFulfilled')),
    __param(2, Request())
], FulfilOrderRoutes.prototype, "fulfilOrder", null);
FulfilOrderRoutes = __decorate([
    Route('fulfil')
], FulfilOrderRoutes);
export { FulfilOrderRoutes };
let OrderRoutes = class OrderRoutes extends Controller {
    /**
       * Place an order
       * @param order An array of the ordered book id's
       * @returns {OrderId}
       */
    async placeOrder(order, request) {
        const ctx = request.ctx;
        this.setStatus(201);
        try {
            const result = await placeOrder(ctx.state.warehouse, order);
            return result;
        }
        catch (e) {
            this.setStatus(500);
            return '';
        }
    }
    /**
     * Get all the pending orders
     * @returns {Order[]}
     */
    async listOrders(request) {
        const ctx = request.ctx;
        return await listOrders(ctx.state.warehouse);
    }
};
__decorate([
    Post(),
    SuccessResponse(201, 'created'),
    __param(0, BodyProp('order')),
    __param(1, Request())
], OrderRoutes.prototype, "placeOrder", null);
__decorate([
    Get(),
    __param(0, Request())
], OrderRoutes.prototype, "listOrders", null);
OrderRoutes = __decorate([
    Route('order')
], OrderRoutes);
export { OrderRoutes };
