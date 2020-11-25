import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:9000'
})

// Request interceptor for API calls
api.interceptors.request.use(async config => {
  if (
    !config.url?.endsWith('login') ||
    !config.url?.endsWith('logout') ||
    !config.url?.endsWith('refresh')
  ) {
    const userToken = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
}, (error) => {
  // I cand handle a request with errors here
  return Promise.reject(error);
});


api.interceptors.response.use(response => {
  // Do something with response data
  return response;
},async error => {
  const originalRequest = error.config

  if (error.response.status === 401 && !error.config.url.endsWith('refresh')){
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await api.post('refresh', {
      token: refreshToken
    })

    localStorage.setItem('token', response.data.accessToken)
    originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

    return api(originalRequest)
  }
  return Promise.reject(error);
});

export default api