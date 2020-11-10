import { Express, NextFunction, Request, Response } from "express";
import { ICinemaCatalogRepository } from "../repository/repository";

export default (app: Express, repository: ICinemaCatalogRepository | null) => {
    app.get('/cities', (req: Request, res: Response, next: NextFunction) => {
        repository?.getAllCities((err, cities) => {
            if(err) return next(err)
            res.json(cities)
        })
    })

    app.get('/cities/:city/movies', (req: Request, res: Response, next: NextFunction) => {
        repository?.getMoviesByCityId(req.params.city, (err, movies) => {
            if(err) return next(err)
            res.json(movies)
        })
    })

    app.get('/cities/:city/movies/:movie', (req: Request, res: Response, next: NextFunction) => {
        repository?.getMovieSessionsByCityId(req.params.movie, req.params.city, (err, sessions) => {
            if(err) return next(err)
            res.json(sessions)
        })
    })

    app.get('/cities/:city/cinemas', (req: Request, res: Response, next: NextFunction) => {
        repository?.getCinemasByCityId(req.params.city, (err, cinemas) => {
            if(err) return next(err)
            res.json(cinemas)
        })
    })

    app.get('/cinemas/:cinema/movies', (req: Request, res: Response, next: NextFunction) => {
        repository?.getMoviesByCinemaId(req.params.cinema, (err, movies) => {
            if(err) return next(err)
            res.json(movies)
        })
    })

    app.get('/cinemas/:cinema/movies/:movie', (req: Request, res: Response, next: NextFunction) => {
        repository?.getMoviesSessionsByCinemaId(req.params.movie, req.params.cinema, (err, sessions) => {
            if(err) return next(err)
            res.json(sessions)
        })
    })
}