import previous_assignment from './assignment-3';
;
;
// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters) {
    // Updated URL to use /api prefix
    const result = await fetch('/api/books/list', {
        body: JSON.stringify(filters ?? []),
        method: 'POST'
    });
    if (result.ok) {
        return await result.json();
    }
    else {
        throw new Error('Failed to fetch books');
    }
}
async function createOrUpdateBook(book) {
    return await previous_assignment.createOrUpdateBook(book);
}
async function removeBook(book) {
    await previous_assignment.removeBook(book);
}
async function lookupBookById(book) {
    // Updated URL to use /api prefix
    const result = await fetch(`/api/books/${book}`);
    if (result.ok) {
        return await result.json();
    }
    else {
        throw new Error('Couldn\'t Find Book');
    }
}
async function placeBooksOnShelf(bookId, numberOfBooks, shelf) {
    // Updated URL to use /api prefix
    const result = await fetch(`/api/warehouse/${bookId}/${shelf}/${numberOfBooks}`, { method: 'put' });
    if (!result.ok) {
        throw new Error('Couldn\'t Place on Shelf');
    }
}
async function orderBooks(order) {
    // Updated URL to use /api prefix
    const result = await fetch('/api/order', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order })
    });
    if (!result.ok) {
        throw new Error('Couldn\'t Place on Shelf');
    }
    return { orderId: await result.text() };
}
async function findBookOnShelf(book) {
    // Updated URL to use /api prefix
    const result = await fetch(`/api/warehouse/${book}`);
    if (result.ok) {
        const results = (await result.json());
        const shelfArray = [];
        for (const shelf of Object.keys(results)) {
            shelfArray.push({
                shelf,
                count: results[shelf]
            });
        }
        return shelfArray;
    }
    else {
        throw new Error('Couldn\'t Find Book');
    }
}
async function fulfilOrder(order, booksFulfilled) {
    // Updated URL to use /api prefix
    const result = await fetch(`/api/fulfil/${order}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booksFulfilled })
    });
    if (!result.ok) {
        throw new Error(`Couldn\'t Fulfil ${await result.text()}`);
    }
}
async function listOrders() {
    // Updated URL to use /api prefix
    const result = await fetch('/api/order');
    if (result.ok) {
        return await result.json();
    }
    else {
        throw new Error('Couldn\'t Find Book');
    }
}
const assignment = 'assignment-4';
export default {
    assignment,
    createOrUpdateBook,
    removeBook,
    listBooks,
    placeBooksOnShelf,
    orderBooks,
    findBookOnShelf,
    fulfilOrder,
    listOrders,
    lookupBookById
};
