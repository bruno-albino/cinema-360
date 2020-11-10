import supertest from 'supertest'
import movies from './cinema-catalog'
import server from '../server/server'
import repository from '../repository/repository'

test('API Cinema Catalog', () => {
    server.start(movies, repository, (err, app) => {
        var cityId: string | null = null
        var movieId: string | null = null
        var cinemaId: string | null = null

        test('GET /cities', () => {
            supertest(app)
                .get('/cities')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0) {
                        cityId = res.body[0]._id
                    }

                    expect(err).toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('GET /cities/:city/movies', () => {
            supertest(app)
                .get(`/cities/${cityId}/movies`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0) {
                        movieId = res.body[0].idFilme
                    }

                    expect(err).toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('GET /cities/:city/movies/:movie', () => {
            supertest(app)
                .get(`/cities/${cityId}/movies/${movieId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (res.body && res.body.length > 0) {
                        cinemaId = res.body[0].idCinema;
                    }

                    expect(err).toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('GET /cities/:city/cinemas', () => {
            supertest(app)
                .get(`/cities/${cityId}/cinemas`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    expect(err).toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('GET /cinemas/:cinema/movies', () => {
            supertest(app)
                .get(`/cinemas/${cinemaId}/movies`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    expect(err).toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        test('GET /cinemas/:cinema/movies/:movie', () => {
            supertest(app)
                .get(`/cinemas/${cinemaId}/movies/${movieId}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    expect(err).toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        repository.disconnect()
        server.stop()
    })
})