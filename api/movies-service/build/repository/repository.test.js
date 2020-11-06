"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = __importDefault(require("./repository"));
var id = null;
test('Repository getAllMovies', function () {
    repository_1.default.getAllMovies(function (err, movies) {
        if (movies && movies.length > 0) {
            id = movies[0]._id;
            expect(err).toBeNull();
            expect(movies.length).toBeGreaterThan(0);
        }
    });
});
test('Repository getMovieById', function () {
    if (!id) {
        console.log('Movies collections empty');
        expect(null).toBeNull();
        return;
    }
    repository_1.default.getMovieById(id, function (err, movie) {
        expect(err).toBeNull();
        expect(movie).not.toBeNull();
    });
});
test('Repository getMoviePremiers', function () {
    repository_1.default.getMoviePremiers(function (err, movies) {
        expect(err).toBeNull();
        expect(movies).not.toBeNull();
        expect(movies.length).toBeGreaterThan(0);
    });
});
test('Repository Disconnect', function () {
    expect(repository_1.default.disconnect()).toEqual(true);
});
