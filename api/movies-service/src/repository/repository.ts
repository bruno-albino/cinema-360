import { MongoCallback } from 'mongodb'
import mongodb from '../config/mongodb'
import { IMovies } from '../interfaces/Movies'

export interface IMoviesRepository {
    getAllMovies(callback: MongoCallback<IMovies[]>): void;
    getMovieById(id: string, callback: MongoCallback<IMovies>): void;
    getMoviePremiers(callback: MongoCallback<IMovies[]>): void;
    disconnect(): void
}

const repostory: IMoviesRepository = {
    
    getAllMovies: (callback: MongoCallback<IMovies[]>) => {
        mongodb.connect((err, db) => {
            db?.collection('movies').find().toArray(callback)
        })
    },
    
    getMovieById: (id: string, callback: MongoCallback<IMovies>) => {
        mongodb.connect((err, db) => {
            db?.collection('movies').findOne({
                _id: require('mongodb').ObjectId(id)
            }, callback)
        })
    },
    
    getMoviePremiers: (callback: MongoCallback<IMovies[]>) => {
    
        const monthAgo = getMonthAgo();
        
        mongodb.connect((err, db) => {
            db?.collection('movies').find({
                dataLancamento: {
                    $gte: monthAgo
                }
            }).toArray(callback)
        })
    },
    
    disconnect: (): boolean => {
        return mongodb.disconnect()
    },
}

function getMonthAgo(): Date {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    monthAgo.setHours(0, 0, 0)
    monthAgo.setMilliseconds(0);

    return monthAgo;
}

export default repostory