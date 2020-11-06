"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("../config/mongodb"));
function getAllMovies(callback) {
    mongodb_1.default.connect(function (err, db) {
        db === null || db === void 0 ? void 0 : db.collection('movies').find().toArray(callback);
    });
}
function getMovieById(id, callback) {
    mongodb_1.default.connect(function (err, db) {
        db === null || db === void 0 ? void 0 : db.collection('movies').findOne({
            _id: require('mongodb').ObjectId(id)
        }, callback);
    });
}
function getMoviePremiers(callback) {
    var monthAgo = getMonthAgo();
    mongodb_1.default.connect(function (err, db) {
        db === null || db === void 0 ? void 0 : db.collection('movies').find({
            dataLancamento: {
                $gte: monthAgo
            }
        }).toArray(callback);
    });
}
function disconnect() {
    return mongodb_1.default.disconnect();
}
function getMonthAgo() {
    var monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    monthAgo.setHours(0, 0, 0);
    monthAgo.setMilliseconds(0);
    return monthAgo;
}
exports.default = { getAllMovies: getAllMovies, disconnect: disconnect, getMovieById: getMovieById, getMoviePremiers: getMoviePremiers };
