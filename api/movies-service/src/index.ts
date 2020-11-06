import dotenv from 'dotenv-safe'
import movies from './api/movies'
import server from './server/server'
import repository from './repository/repository'

dotenv.config()

server.start(movies, repository, () => {
    console.log(`API listening on PORT: ${process.env.PORT}`)
})