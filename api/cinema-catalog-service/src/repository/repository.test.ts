import repository from './repository'

var cityId: string | null = null
var cinemaId: string | null = null
var movieId: string | null = null

test('Repository getAllCities', () => {
    repository.getAllCities((err, cities) => {
        if(cities && cities.length > 0) {
            cityId = cities[0]._id
        }
        expect(err).toBeNull()
        expect(cities).not.toBeNull()
    })
})

test('Repository getCinemasByCityId', () => {
    repository.getCinemasByCityId(cityId, (err, cinemas) => {
        if(cinemas && cinemas.length > 0) {
            cinemaId = cinemas[0]._id
        }

        expect(err).toBeNull()
        expect(cinemas).not.toBeNull()
    })
})

test('Repository getMoviesByCinemaId', () => {
    repository.getMoviesByCinemaId(cinemaId, (err, movies) => {
        expect(err).toBeNull()
        expect(movies).not.toBeNull()
    })
})

test('Repository getMoviesByCityId', () => {
    repository.getMoviesByCityId(cityId, (err, movies) => {
        if(movies && movies.length > 0) {
            movieId = movies[0].idFilme;
        }

        expect(err).toBeNull()
        expect(movies).not.toBeNull()
    })
})

test('Repository getMovieSessionsByCityId', () => {
    repository.getMovieSessionsByCityId(movieId, cityId, (err, sessions) => {
        expect(err).toBeNull()
        expect(sessions).not.toBeNull()
    })
})

test('Repository getMovieSessionsByCinemaId', () => {
    repository.getMoviesSessionsByCinemaId(movieId, cinemaId, (err, sessions) => {
        expect(err).toBeNull()
        expect(sessions).not.toBeNull()
    })
})


test('Repository Disconnect', () => {
    expect(repository.disconnect()).toEqual(true)
})