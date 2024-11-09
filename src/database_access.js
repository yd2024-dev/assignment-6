import { MongoClient } from 'mongodb';
// This is the connection string for the mongo database in our docker compose file
// We're using process.env to detect if a different mongo uri is set, primarily for testing purpuses
const uri = global.MONGO_URI ?? 'mongodb://mongo';
// We're setting up a client, opening the database for our project, and then opening
// a typed collection for our books.
export const client = new MongoClient(uri);
export function getBookDatabase(dbName) {
    const database = client.db(dbName ?? Math.floor(Math.random() * 100000).toPrecision().toString());
    const books = database.collection('books');
    return {
        database,
        books
    };
}
if (import.meta.vitest !== undefined) {
    const { test, expect } = import.meta.vitest;
    test('Can Setup Test DB', () => {
        const { database } = getBookDatabase();
        expect(database.databaseName, `URI: ${uri}, DB: ${database.databaseName}`).not.toEqual('mcmasterful-books');
    });
}
