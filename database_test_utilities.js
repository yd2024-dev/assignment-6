import { ObjectId } from 'mongodb';
export async function seedBookDatabase(accessor, { books }) {
    await Promise.all(Object.keys(books).map(async (id) => {
        const objectId = ObjectId.createFromHexString(id);
        return await accessor.books.insertOne({ ...books[id], _id: objectId, id });
    }));
}
export async function seedWarehouseDatabase(accessor, { books, orders }) {
    await Promise.all([
        ...Object.keys(books).flatMap(async (book) => {
            const shelves = books[book];
            return Object.keys(shelves).map(async (shelf) => {
                return await accessor.books.insertOne({ book, shelf, count: shelves[shelf] });
            });
        }),
        ...Object.keys(orders).map(async (order) => {
            const _id = ObjectId.createFromHexString(order);
            return await accessor.orders.insertOne({ _id, books: orders[order] });
        })
    ]);
}
export function generateId() {
    const id = new ObjectId();
    return (id.toHexString());
}
