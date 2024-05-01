import axios from 'axios'

const $authHost = axios.create({
    baseURL: 'https://edoc-flow-api.onrender.com/'
})

const $host = axios.create({
    baseURL: 'https://edoc-flow-api.onrender.com/'
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