import api from '../services/api'

export interface IMovies {
    titulo: string;
    duracao: number;
    sinopse: string;
}

const getAll = async (): Promise<IMovies[]> => {
    try {
        const response = await api.get('movies')
        return response.data
    } catch(error) {
        if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        throw error
    } 
}

const moviesRepository = {
    getAll
}

export default moviesRepository