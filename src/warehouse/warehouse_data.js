import { ObjectId } from 'mongodb';
import { getDefaultWarehouseDatabase } from './warehouse_database';
export class InMemoryWarehouse {
    books;
    orders;
    constructor(params) {
        const { books, orders } = params ?? {};
        this.books = books ?? {};
        this.orders = orders ?? {};
    }
    async placeBookOnShelf(bookId, shelf, count) {
        const book = this.books[bookId] ?? {};
        this.books[bookId] = { ...book, [shelf]: count };
    }
    async getCopiesOnShelf(bookId, shelf) {
        const book = this.books[bookId] ?? {};
        return book[shelf] ?? 0;
    }
    async getCopies(bookId) {
        const book = this.books[bookId] ?? {};
        return book;
    }
    async getOrder(order) {
        return order in this.orders ? this.orders[order] : false;
    }
    async removeOrder(order) {
        const orders = {};
        for (const orderId of Object.keys(this.orders)) {
            if (orderId !== order) {
                orders[orderId] = this.orders[orderId];
            }
        }
        this.orders = orders;
    }
    async listOrders() {
        return Object.keys(this.orders).map((orderId) => {
            const books = this.orders[orderId];
            return { orderId, books };
        });
    }
    async placeOrder(books) {
        const order = new ObjectId().toHexString();
        this.orders[order] = books;
        return order;
    }
}
export async function getDefaultWarehouseData() {
    return await getDefaultWarehouseDatabase();
}
