import { Router } from "express"
import { login, logout, verifyJWT } from './utils/jwt'
import httpProxy from 'express-http-proxy'

const moviesServiceProxy = httpProxy('movies-ms:3001')
const cinemaCatalogServiceProxy = httpProxy('cinema-catalog-ms:3002')
//Proxy Request
const routes = Router()

routes.get('/movies', verifyJWT, moviesServiceProxy)
routes.get('/movies/premieres', verifyJWT, moviesServiceProxy)
routes.get('/movies/:id', verifyJWT, moviesServiceProxy)

routes.get('/cities', verifyJWT, cinemaCatalogServiceProxy)
routes.get('/cities/:city/movies', verifyJWT, cinemaCatalogServiceProxy)
routes.get('/cities/:city/movies/:movie', verifyJWT, cinemaCatalogServiceProxy)
routes.get('/cities/:city/cinemas', verifyJWT, cinemaCatalogServiceProxy)
routes.get('/cinemas/:cinema/movies', verifyJWT, cinemaCatalogServiceProxy)
routes.get('//:cinema/movies/:movie', verifyJWT, cinemaCatalogServiceProxy)


routes.post('/login', login)
routes.get('/logout', logout)

export default routes