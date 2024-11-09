import previous_assignment from './assignment-3'

export type BookID = string

export interface Book {
  id?: BookID
  name: string
  author: string
  description: string
  price: number
  image: string
};

export interface Filter {
  from?: number
  to?: number
  name?: string
  author?: string
};

// If multiple filters are provided, any book that matches at least one of them should be returned
// Within a single filter, a book would need to match all the given conditions
async function listBooks(filters?: Filter[]): Promise<Book[]> {
  // Updated URL to use /api prefix
  const result = await fetch('/api/books/list', {
    body: JSON.stringify(filters ?? []),
    method: 'POST'
  });

  if (result.ok) {
    return await result.json() as Book[];
  } else {
    throw new Error('Failed to fetch books');
  }
}

async function createOrUpdateBook(book: Book): Promise<BookID> {
  return await previous_assignment.createOrUpdateBook(book);
}

async function removeBook(book: BookID): Promise<void> {
  await previous_assignment.removeBook(book);
}

async function lookupBookById(book: BookID): Promise<Book> {
  // Updated URL to use /api prefix
  const result = await fetch(`/api/books/${book}`);

  if (result.ok) {
    return await result.json() as Book;
  } else {
    throw new Error('Couldn\'t Find Book');
  }
}

export type ShelfId = string
export type OrderId = string

async function placeBooksOnShelf(bookId: BookID, numberOfBooks: number, shelf: ShelfId): Promise<void> {
  // Updated URL to use /api prefix
  const result = await fetch(`/api/warehouse/${bookId}/${shelf}/${numberOfBooks}`, { method: 'put' });

  if (!result.ok) {
    throw new Error('Couldn\'t Place on Shelf');
  }
}

async function orderBooks(order: BookID[]): Promise<{ orderId: OrderId }> {
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

async function findBookOnShelf(book: BookID): Promise<Array<{ shelf: ShelfId, count: number }>> {
  // Updated URL to use /api prefix
  const result = await fetch(`/api/warehouse/${book}`);

  if (result.ok) {
    const results = (await result.json()) as Record<ShelfId, number>;
    const shelfArray: Array<{ shelf: ShelfId, count: number }> = [];
    
    for (const shelf of Object.keys(results)) {
      shelfArray.push({
        shelf,
        count: results[shelf]
      });
    }
    return shelfArray;
  } else {
    throw new Error('Couldn\'t Find Book');
  }
}

async function fulfilOrder(order: OrderId, booksFulfilled: Array<{ book: BookID, shelf: ShelfId, numberOfBooks: number }>): Promise<void> {
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

async function listOrders(): Promise<Array<{ orderId: OrderId, books: Record<BookID, number> }>> {
  // Updated URL to use /api prefix
  const result = await fetch('/api/order');

  if (result.ok) {
    return await result.json() as Array<{ orderId: OrderId, books: Record<BookID, number> }>;
  } else {
    throw new Error('Couldn\'t Find Book');
  }
}

const assignment = 'assignment-4'

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
}
