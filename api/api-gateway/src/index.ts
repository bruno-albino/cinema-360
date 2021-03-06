import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import routes from './routes'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ 
    extended: false
}))
app.use(cookieParser())
app.use('/', routes)

const server = http.createServer(app)
const port = 9000
server.listen(port, () => {
    console.log(`API gateway listening on PORT ${port}`)
})