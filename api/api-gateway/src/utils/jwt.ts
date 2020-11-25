import jwt, { VerifyErrors } from 'jsonwebtoken'
import dotenv from 'dotenv-safe'
import { NextFunction, Request, Response } from 'express'
dotenv.config()

interface JWTPayload {
    id?: number,
    email: string
}
let refreshTokens: string[] = []

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.header('authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if(!token) return res.status(401).json({
        auth: false, message: 'No token provided'
    })

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err, decoded)=> {
        console.log(err)
        if(err) return res.status(401).json({
            auth: false,
            message: 'Failed to authenticate token'
        })
        const tokenDecoded = decoded as JWTPayload
        req.body.userId = tokenDecoded.id
        next()
    })
}

const refreshToken = (req: Request, res: Response) => {
    const { token } = req.body
    if(!token) return res.sendStatus(401)
    if(!refreshTokens.includes(token)) return res.sendStatus(403)

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string, (err: VerifyErrors | null, user: object | undefined) => {
        if(err) return res.sendStatus(403)
        console.log('user')
        console.log(user)
        const userDecoded = user as JWTPayload
        const accessToken = generateAccessToken({ email: userDecoded.email })
        res.json({ accessToken })
    })
}

const login = (req: Request, res: Response) => {
    const { email, password } = req.body
    if(email === 'bruno-albino@hotmail.com' && password === '123') {
        const user = {
            email,
            id: 1
        }
        
        const accessToken = generateAccessToken(user)
        const refreshToken =  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string)
        refreshTokens.push(refreshToken)
        return res.status(200).json({ auth: true, accessToken, refreshToken })
    }

    res.status(400).json({ message: 'Login inválido!' })
}

const logout = (req: Request, res: Response) => {
    refreshTokens = []
    res.status(200).json({
        auth: false,
        token: null
    })
}

function generateAccessToken(user: JWTPayload) {
    return  jwt.sign(user, process.env.TOKEN_SECRET as string, {
        expiresIn: '10s'
    })
}

export {
    verifyJWT,
    login,
    logout,
    refreshToken
}