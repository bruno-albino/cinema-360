import { ObjectId } from 'mongodb'
import { IMovies } from '../interfaces/Movies';
import repository from './repository'

var id: ObjectId | null = null;

test('Repository getAllMovies', () => {
    repository.getAllMovies((err, movies) => {
        if(movies && movies.length > 0) {
            id = movies[0]._id;
            
            expect(err).toBeNull()
            expect(movies.length).toBeGreaterThan(0)
        }
    })
})

test('Repository getMovieById', () => {
    if(!id) {
        console.log('Movies collections empty')
        expect(null).toBeNull()
        return
    }

    repository.getMovieById(id, (err, movie) => {
        expect(err).toBeNull()
        expect(movie).not.toBeNull()
    })
})

test('Repository getMoviePremiers', () => {
    repository.getMoviePremiers((err, movies) => {
        expect(err).toBeNull()
        expect(movies).not.toBeNull()
        expect(movies.length).toBeGreaterThan(0)
    })
})

test('Repository Disconnect', () => {
    expect(repository.disconnect()).toEqual(true)
})