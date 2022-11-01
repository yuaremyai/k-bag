import axios from 'axios';

const url = process.env.REACT_APP_URL

const api = axios.create({
    baseURL:url})

api.interceptors.request.use( (config) =>{
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    config.withCredentials = true
    return config
} )

export default api