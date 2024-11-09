import { z } from 'zod';
import { getBookDatabase } from '../database_access';
import { ObjectId } from 'mongodb';
import { generateId, seedBookDatabase } from '../../database_test_utilities';
async function getBook(id, { books }) {
    if (id.length !== 24) {
        console.error('Failed with id: ', id);
        return false;
    }
    const result = await books.findOne({ _id: ObjectId.createFromHexString(id.trim()) });
    if (result === null) {
        return false;
    }
    const book = {
        id,
        name: result.name,
        author: result.author,
        description: result.description,
        price: result.price,
        image: result.image
    };
    return book;
}
export default function getBookRoute(router, books) {
    router.register({
        name: 'get book',
        method: 'get',
        path: '/books/:id',
        validate: {
            params: z.object({
                id: z.string().min(2)
            })
        },
        handler: async (ctx, next) => {
            const { id } = ctx.request.params;
            const result = await getBook(id, books);
            if (result === false) {
                ctx.status = 404;
                return await next();
            }
            ctx.body = result;
            await next();
        }
    });
}
if (import.meta.vitest !== undefined) {
    const { test, expect } = import.meta.vitest;
    test('Can Find A Matching Book', async () => {
        const db = getBookDatabase();
        const id = generateId();
        const testBook = {
            id,
            name: 'My Book!',
            author: 'test author',
            description: '',
            price: 0,
            image: ''
        };
        await seedBookDatabase(db, { books: { [id]: testBook } });
        const result = await getBook(id, db);
        expect(result).toBeTruthy();
        if (result !== false) {
            expect(result.name).toEqual(testBook.name);
            expect(result.author).toEqual(testBook.author);
            expect(result.id).toEqual(testBook.id);
        }
    });
}
