import { NextFunction, Express, Request, Response } from "express"
import { IMoviesRepository } from '../repository/repository'

export default (app: Express, repository: IMoviesRepository | null) => {
    app.get('/movies', (req: Request, res: Response, next: NextFunction) => {
        repository?.getAllMovies((err, movies) => {
            if(err) return next(err)

            res.json(movies)
        })
    })

    app.get('/movies/premieres', (req: Request, res: Response, next: NextFunction) => {
        repository?.getMoviePremiers((err, movies) => {
            if(err) return next(err)
            
            res.json(movies)
        })
    })

    app.get('/movies/:id', (req: Request, res: Response, next: NextFunction) => {
        repository?.getMovieById(req.params.id, (err, movie) => {
            if(err) return next(err)
            res.json(movie)
        })
    })

    
}