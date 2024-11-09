import { MongoMemoryServer } from 'mongodb-memory-server';
import { afterAll } from 'vitest';
export async function setup() {
    const instance = await MongoMemoryServer.create({ binary: { version: '7.0.7' } });
    while (instance.state === 'new') {
        await instance.start();
    }
    const uri = instance.getUri();
    global.__MONGOINSTANCE = instance;
    global.MONGO_URI = uri.slice(0, uri.lastIndexOf('/'));
}
export async function teardown() {
    const instance = global.__MONGOINSTANCE;
    await instance.stop({ doCleanup: true });
}
await setup();
afterAll(teardown);
