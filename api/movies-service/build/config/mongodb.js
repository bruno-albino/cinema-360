"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = require("mongodb");
var dotenv_safe_1 = require("dotenv-safe");
dotenv_safe_1.config();
var connection = null;
var db = null;
function connect(callback) {
    if (connection)
        return callback(null, db);
    mongodb_1.MongoClient.connect(process.env.MONGO_CONNECTION, function (err, conn) {
        if (err)
            return callback(err, null);
        connection = conn;
        db = conn.db(process.env.DATABASE_NAME);
        conn.db();
        return callback(null, db);
    });
}
function disconnect() {
    if (!connection)
        return true;
    connection.close();
    connection = null;
    return true;
}
exports.default = { connect: connect, disconnect: disconnect };
