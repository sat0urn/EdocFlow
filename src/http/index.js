import axios from 'axios'

const $authHost = axios.create({
    baseURL: 'http://localhost:8080/'
})

const $host = axios.create({
    baseURL: 'http://localhost:8080/'
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