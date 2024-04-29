import axios from 'axios'

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}