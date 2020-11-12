import axios from 'axios'

const api = axios.create({
    baseURL: 'api-gateway-container:3000'
})

export default api