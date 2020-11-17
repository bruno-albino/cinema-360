import jwt from 'jsonwebtoken'
import dotenv from 'dotenv-safe'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

interface JWTPayload {
    id: number,
    name: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-access-token')
    if(!token) return res.status(401).json({
        auth: false, message: 'No token provided'
    })asdsad

    jwt.verify(token, process.env.SECRET as string, (err, decoded)=> {
        if(err) return res.status(500).json({
            auth: false,
            message: 'Failed to authenticate token'
        })
        const tokenDecoded = decoded as JWTPayload
        req.body.userId = tokenDecoded.id
        next()
    })
}

const login = (req: Request, res: Response) => {
    const { name, password } = req.body
    if(name === 'Bruno' && password === '123') {
        const id = 1
        const token = jwt.sign({
            id,
            name: 'Bruno'
        }, process.env.SECRET as string, {
            expiresIn: 6
        })
        return res.status(200).json({ auth: true, token: token })
    }

    res.status(500).json({ message: 'Login inválido!' })
}

const logout = (req: Request, res: Response) => {
    res.status(200).json({
        auth: false,
        token: null
    })
}


export {
    verifyJWT,
    login,
    logout
}