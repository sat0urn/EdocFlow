import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

const registration = async (
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    country,
    city
) => {
    const {data} = await $host.post(
        '/users/registration',
        {
            email,
            firstName,
            lastName,
            phoneNumber,
            password,
            country,
            city
        })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

const login = async (
    email,
    password
) => {
    const {data} = await $host.post(
        '/users/login',
        {
            email,
            password
        })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

const updatePassword = async (
    oldPassword,
    newPassword,
) => {
    const response = await $authHost.patch(
        '/users/updatePassword',
        {
            oldPassword,
            newPassword
        })
    return response.data
}

const check = async () => {
    const {data} = await $authHost.get('/users/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export {
    registration,
    login,
    updatePassword,
    check
}