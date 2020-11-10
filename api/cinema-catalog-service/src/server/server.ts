import express, { NextFunction, Request, Express, Response } from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import { Server } from 'http'
import dotenv from 'dotenv-safe'

import { ICinemaCatalogRepository } from '../repository/repository'

dotenv.config()
var server: Server | null = null

interface IServerCallBack {
    (err: Error | null, server: Server | null): void
}

export interface API {
    (app: Express, repository: ICinemaCatalogRepository | null): void
}

function start(api: API, repository: ICinemaCatalogRepository | null, callback: IServerCallBack): void {
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        callback(new Error('Something went wrong!, err:' + err), null)

        res.status(500).send('Somenthing went wrong')
    })

    api(app, repository)
    server = app.listen(parseInt(process.env.PORT as string), () => callback(null, server))
}

function stop(): boolean {
    if(server) server.close()
    return true
}

export default {
    start,
    stop
}