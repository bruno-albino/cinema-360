import { config } from 'dotenv-safe'
import cinemaCatalog from './api/cinema-catalog'
import server from './server/server'
import repository from './repository/repository'

config()

server.start(cinemaCatalog, repository, () => {
    console.log(`Cinema Microsservice listening on PORT ${process.env.PORT}`)
})