import mongodb from '../config/mongodb'
import { MongoCallback, ObjectId } from "mongodb";
import { ICinemaCatalog } from '../interfaces/CinemaCatalog';
import { ICinema, IMovie, IMovieSession, ISessions } from '../interfaces/Cinema';

export interface ICinemaCatalogRepository {
    getAllCities(callback: MongoCallback<ICinemaCatalog[]>): void
    getCinemasByCityId(cityId: string | null, callback: MongoCallback<ICinema[] | null>): void
    getMoviesByCinemaId(cinemaId: string | null, callback: MongoCallback<ISessions[]>): void
    getMoviesByCityId(cityId: string | null, callback: MongoCallback<IMovie[] | null>): void
    getMovieSessionsByCityId(movieId: string | null, cityId: string | null, callback: MongoCallback<IMovieSession[] | null>): void
    getMoviesSessionsByCinemaId(movieId: string | null, cinemaId: string | null, callback: MongoCallback<IMovieSession[] | null>): void
    disconnect(): boolean
}

const repository: ICinemaCatalogRepository = {
    getAllCities: (callback: MongoCallback<ICinemaCatalog[]>): void => {
        mongodb.connect((err, db) => {
            db?.collection('cinemaCatalog').find({}).toArray(callback)
        })
    },

    getCinemasByCityId: (cityId: string | null, callback: MongoCallback<ICinema[] | null>): void => {
        var objCityId = new ObjectId(cityId as string)
        mongodb.connect((err, db) => {
            db?.collection('cinemaCatalog').find<ICinemaCatalog>({
                _id: objCityId,
            }).toArray((err, cities) => {
                if (err) return callback(err, null)

                callback(err, cities[0].cinemas)
            })
        })
    },

    getMoviesByCinemaId: (cinemaId: string | null, callback: MongoCallback<ISessions[]>): void => {
        var objCinemaId = new ObjectId(cinemaId as string)
        mongodb.connect((err, db) => {
            db?.collection('cinemaCatalog').aggregate([
                { $match: { 'cinemas._id': objCinemaId } },
                { $unwind: '$cinemas' },
                { $unwind: '$cinemas.salas' },
                { $unwind: '$cinemas.salas.sessoes' },
                { $group: { _id: { filme: '$cinemas.salas.sessoes.filme', idFilme: '$cinemas.salas.sessoes.idFilme' } } },
            ]).toArray(callback)
        })
    },


    getMoviesByCityId: (cityId: string | null, callback: MongoCallback<IMovie[] | null>): void => {
        var objCityId = new ObjectId(cityId as string)
        mongodb.connect((err, db) => {
            db?.collection('cinemaCatalog').aggregate([
                { $match: { '_id': objCityId } },
                { $unwind: '$cinemas' },
                { $unwind: '$cinemas.salas' },
                { $unwind: '$cinemas.salas.sessoes' },
                { $group: { _id: { filme: '$cinemas.salas.sessoes.filme', idFilme: '$cinemas.salas.sessoes.idFilme' } } },
            ]).toArray((err, sessions) => {
                if (err) return callback(err, null)

                callback(err, sessions.map(item => ({
                    idFilme: item._id.idFilme, filme: item._id.filme
                })))
            })
        })
    },

    getMovieSessionsByCityId: (movieId: string | null, cityId: string | null, callback: MongoCallback<IMovieSession[] | null>): void => {
        var objMovieId = new ObjectId(movieId as string)
        var objCityId = new ObjectId(cityId as string)

        mongodb.connect((err, db) => {
            db?.collection('cinemaCatalog').aggregate([
                { $match: { '_id': objCityId } },
                { $unwind: '$cinemas' },
                { $unwind: '$cinemas.salas' },
                { $unwind: '$cinemas.salas.sessoes' },
                { $match: { 'cinemas.salas.sessoes.idFilme': objMovieId } },
                {
                    $group: {
                        _id: {
                            filme: '$cinemas.salas.sessoes.filme',
                            idFilme: '$cinemas.salas.sessoes.idFilme',
                            idCinema: '$cinemas._id',
                            sala: '$cinemas.salas.nome',
                            sessao: '$cinemas.salas.sessoes'
                        }
                    }
                }
            ]).toArray((err, sessions) => {
                if (err) return callback(err, null)
                callback(err, sessions.map(item => ({
                    idFilme: item._id.idFilme,
                    filme: item._id.filme,
                    idCinema: item._id.idCinema,
                    sala: item._id.sala,
                    sessao: item._id.sessao
                })))
            })
        })
    },

    getMoviesSessionsByCinemaId: (movieId: string | null, cinemaId: string | null, callback: MongoCallback<IMovieSession[] | null>): void => {
        var objCinemaId = new ObjectId(cinemaId as string)
        var objMovieId = new ObjectId(movieId as string)
        mongodb.connect((err, db) => {
            db?.collection('cinemaCatalog').aggregate([
                { $match: { 'cinemas._id': objCinemaId } },
                { $unwind: '$cinemas' },
                { $unwind: '$cinemas.salas' },
                { $unwind: '$cinemas.salas.sessoes' },
                { $match: { 'cinemas.salas.sessoes.idFilme': objMovieId } },
                {
                    $group: {
                        _id: {
                            filme: '$cinemas.salas.sessoes.filme',
                            idFilme: '$cinemas.salas.sessoes.idFilme',
                            sala: '$cinemas.salas.nome',
                            sessao: '$cinemas.salas.sessoes'
                        }
                    }
                }
            ]).toArray((err, sessions) => {
                if (err) return callback(err, null)

                callback(err, sessions.map(item => ({
                    idFilme: item._id.idFilme,
                    filme: item._id.filme,
                    sala: item._id.sala,
                    sessao: item._id.sessao
                })))
            })
        })
    },

    disconnect: (): boolean => {
        return mongodb.disconnect()
    }

}
export default repository