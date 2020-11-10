import { MongoError, Db } from 'mongodb'
import mongodb from './mongodb'

test('MongoDB Connection', () => {
    mongodb.connect((err: MongoError | null, conn: Db | null) => {

        expect(err).toBeNull();
        expect(conn).not.toBeNull()
    })
})

test('MongoDB Disconnection', () => {
    expect(mongodb.disconnect()).toEqual(true)
})