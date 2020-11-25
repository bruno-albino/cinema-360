import api from "../services/api"

export interface IUser {
    email: string;
    password: string;
}

export interface ResponseSession {
    auth: boolean;
    accessToken: string;
    refreshToken: string;
}

const login = async (user: IUser): Promise<ResponseSession> => {
    const response = await api.post('login', user)
    return response.data
}

const logout = async (): Promise<void> => {
    await api.post('logout')
}

const sessionsRepository = {
    login,
    logout
}

export default sessionsRepository