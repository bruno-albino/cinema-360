"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongodb_1 = __importDefault(require("./config/mongodb"));
mongodb_1.default.connect(function (err, db) {
    db === null || db === void 0 ? void 0 : db.collection('movies').insertMany([
        {
            titulo: 'Os Vingadores: Guerra Infinita',
            sinopse: 'Os heróis mais poderosos da Marvel enfrentando o Thanos',
            duracao: 120,
            dataLancamento: new Date('2018-05-01T00:00:00Z'),
            imagem: 'http://luiztools.com.br/vingadores-gi.jpg',
            categorias: ['Aventura', 'Ação']
        },
        {
            titulo: 'Os Vingadores: Era de Ultron',
            sinopse: 'Os heróis mais poderosos da Marvel enfrentando o Ultron',
            duracao: 110,
            dataLancamento: new Date('2016-05-01T00:00:00Z'),
            imagem: 'http://luiztools.com.br/vingadores-eu.jpg',
            categorias: ['Aventura', 'Ação']
        },
        {
            titulo: 'Os Vingadores',
            sinopse: 'Os heróis mais poderosos da Marvel enfrentando o Loki',
            duracao: 100,
            dataLancamento: new Date('2014-05-01T00:00:00Z'),
            imagem: 'http://luiztools.com.br/vingadores.jpg',
            categorias: ['Aventura', 'Ação']
        },
    ]);
});
