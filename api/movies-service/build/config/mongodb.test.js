"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("./mongodb"));
test('MongoDB Connection', function () {
    mongodb_1.default.connect(function (err, conn) {
        expect(err).toBeNull();
        expect(conn).not.toBeNull();
    });
});
test('MongoDB Disconnection', function () {
    expect(mongodb_1.default.disconnect()).toBe(true);
});
