import axios from 'axios'

const api = axios.create({
    baseURL: 'http://api-gateway:3000'
})

export default api