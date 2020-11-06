import { MongoClient, Db, MongoError } from 'mongodb'
import { config } from 'dotenv-safe'
config()

var connection: MongoClient | null = null
var db: Db | null = null

export interface IMongoCallback {
    (error: MongoError | null, result: Db | null): void;
}

function connect(callback: IMongoCallback) : void {
    if(connection) return callback(null, db)

    MongoClient.connect(process.env.MONGO_CONNECTION as string, (err, conn) => {
        if(err) return callback(err, null)

        connection = conn
        db = conn.db(process.env.DATABASE_NAME)
        conn.db()
        return callback(null, db)
    })
}

function disconnect() : boolean {
    if(!connection) return true
    connection.close()
    connection = null
    return true
}

export default { connect, disconnect }