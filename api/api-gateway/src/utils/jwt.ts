import jwt, { VerifyErrors } from 'jsonwebtoken'
import dotenv from 'dotenv-safe'
import { NextFunction, Request, Response } from 'express'
import SessionsModel, { ISession } from '../models/sessions'

dotenv.config()

interface JWTPayload {
    id?: number,
    email: string
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).json({
        auth: false, message: 'No token provided'
    })

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded)=> {
        if(err) return res.status(401).json({
            auth: false,
            message: 'Failed to authenticate token'
        })
        const tokenDecoded = decoded as JWTPayload
        req.body.userId = tokenDecoded.id
        next()
    })
}

const refreshToken = async (req: Request, res: Response) => {
    const { token } = req.body
    if(!token) return res.sendStatus(401)
    const session = await SessionsModel.findOne({
        refreshToken: token
    })
    if(!session) return res.sendStatus(403)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: object | undefined) => {
        if(err) return res.sendStatus(403)
        const userDecoded = user as JWTPayload
        const accessToken = generateAccessToken({ email: userDecoded.email })
        res.json({ accessToken })
    })
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if(email === 'bruno-albino@hotmail.com' && password === '123') {
        const user = {
            email,
            id: 1
        }
        
        const accessToken = generateAccessToken(user)
        const refreshToken =  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)
        const session: ISession = {
            refreshToken: refreshToken
        }
        await SessionsModel.create(session)
        return res.status(200).json({ auth: true, accessToken, refreshToken })
    }

    res.status(400).json({ message: 'Login inválido!' })
}

const logout = async (req: Request, res: Response) => {
    const { token } = req.body

    await SessionsModel.deleteOne({
        refreshToken: token
    })
    return res.status(200).json({
        auth: false,
        token: null
    })
    
}

function generateAccessToken(user: JWTPayload) {
    return  jwt.sign(user, process.env.TOKEN_SECRET as string, {
        expiresIn: '5s'
    })
}

export {
    verifyJWT,
    login,
    logout,
    refreshToken
}