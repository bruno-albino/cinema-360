"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var express_http_proxy_1 = __importDefault(require("express-http-proxy"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var helmet_1 = __importDefault(require("helmet"));
var app = express_1.default();
var userServiceProxy = express_http_proxy_1.default('http://localhost:3001');
var productsServiceProxy = express_http_proxy_1.default('http://localhost:3002');
//Proxy Request
app.get('/users', function (req, res, next) {
    userServiceProxy(req, res, next);
});
app.get('/products', function (req, res, next) {
    productsServiceProxy(req, res, next);
});
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use(cookie_parser_1.default());
var server = http_1.default.createServer(app);
server.listen(3000);
