var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Route, Request, Body, Post } from 'tsoa';
import listBooks from './list';
import createOrUpdateBook from './create_or_update';
let BooksRoutes = class BooksRoutes extends Controller {
    async listBooks(filters, request) {
        const ctx = request.ctx;
        return await listBooks(ctx.state.books, filters);
    }
    async createOrUpdateBook(book, request) {
        const ctx = request.ctx;
        const result = await createOrUpdateBook(book, ctx.state.books);
        if (result !== false) {
            return { id: result };
        }
        else {
            this.setStatus(404);
            return { id: book.id ?? '' };
        }
    }
};
__decorate([
    Post('list'),
    __param(0, Body()),
    __param(1, Request())
], BooksRoutes.prototype, "listBooks", null);
__decorate([
    Post(),
    __param(0, Body()),
    __param(1, Request())
], BooksRoutes.prototype, "createOrUpdateBook", null);
BooksRoutes = __decorate([
    Route('books')
], BooksRoutes);
export { BooksRoutes };
