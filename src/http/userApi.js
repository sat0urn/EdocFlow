import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export const registration = async (
    email,
    firstName,
    lastName,
    phoneNumber,
    password,
    country,
    city
) => {
    const {data} = await $host.post(
        '/user/registration',
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

export const login = async (
    email,
    password
) => {
    const {data} = await $host.post(
        '/user/login',
        {
            email,
            password
        })
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const updatePassword = async (
    oldPassword,
    newPassword,
) => {
    return await $authHost.patch(
        '/user/updatePassword',
        {
            oldPassword: oldPassword,
            newPassword: newPassword
        }
    )
}

export const check = async () => {
    const {data} = await $authHost.get('/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}