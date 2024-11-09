import deleteBook from './delete';
import getBookRoute from './lookup';
export function setupBookRoutes(router, books) {
    // Setup Book Delete Route
    deleteBook(router, books);
    // Lookup Book
    getBookRoute(router, books);
}
