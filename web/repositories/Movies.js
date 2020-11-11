import api from '../services/api'

const getAll = async () => {
    const response = await api.get('movies')
    return response.data
}


export default {
    getAll
}