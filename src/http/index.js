import axios from 'axios'

const $authHost = axios.create({
    baseURL: import.meta.env.VITE_SERVER_ADDRESS
})

const $host = axios.create({
    baseURL: import.meta.env.VITE_SERVER_ADDRESS
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