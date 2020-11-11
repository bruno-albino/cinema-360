import http from 'http'
import express from 'express'
import httpProxy from 'express-http-proxy'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

const app = express()
const moviesServiceProxy = httpProxy('http://localhost:3001')
const cinemaCatalogServiceProxy = httpProxy('http://localhost:3002')

//Proxy Request
app.get('/movies', moviesServiceProxy)
app.get('/movies/premieres', moviesServiceProxy)
app.get('/movies/:id', moviesServiceProxy)

app.get('/cities', cinemaCatalogServiceProxy)
app.get('/cities/:city/movies', cinemaCatalogServiceProxy)
app.get('/cities/:city/movies/:movie', cinemaCatalogServiceProxy)
app.get('/cities/:city/cinemas', cinemaCatalogServiceProxy)
app.get('/cinemas/:cinema/movies', cinemaCatalogServiceProxy)
app.get('/cinemas/:cinema/movies/:movie', cinemaCatalogServiceProxy)

app.use(cors())
app.use(logger('dev'))
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cookieParser())

const server = http.createServer(app)
server.listen(3000)