import axios from 'axios'

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const $host = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

const authInterceptor = config => {
    if (localStorage.getItem('token') != null) {
        config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
        return config
    } else {
        return config
    }
}

$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}