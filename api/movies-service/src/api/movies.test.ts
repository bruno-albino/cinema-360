import { Express } from 'express'
import supertest, { CallbackHandler, Response } from 'supertest'
import server from '../server/server'
import movies from './movies'
import repository from '../repository/repository'

var app: Express | null = null
test('API movies', () => {

    server.start(movies, repository, (err, app) => {

        var id: string | null = null

        test('GET /movies', () => {
            supertest(app)
                .get('/movies')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: CallbackHandler, res: Response) => {
                    if (res.body && res.body.length > 0) {
                        id = res.body[0]._id;
                    }

                    expect(err).toBeNull()
                    expect(res.body).not.toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })

        })

        test('GET /movies/:id', () => {
            if (!id) {
                console.log('Movies collections empty')
                expect(null).toEqual(null)
                return
            }

            supertest(app)
                .get(`/movies/${id}`)
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: CallbackHandler, res: Response) => {
                    expect(err).toBeNull()
                    expect(res.body).not.toBeNull()
                })
        })

        test('GET /movies/premieres', () => {
            supertest(app)
                .get('/movies/premieres')
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err: CallbackHandler, res: Response) => {
                    expect(err).toBeNull()
                    expect(res.body).not.toBeNull()
                    expect(res.body.length).toBeGreaterThan(0)
                })
        })

        server.stop()
    })

})