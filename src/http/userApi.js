import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

const registration = async (userForm) => {
  const {data} = await $host.post('/users/registration', userForm)
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

const login = async (
  email,
  password
) => {
  const {data} = await $host.post('/users/login', {email, password})
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

const getAllEmails = async () => {
  const response = await $authHost.get('/users/getAllEmails')
  return response.data
}

const validateEmailToSend = async (data) => {
  const response = await $host.post('/users/validate-email', data)
  console.log(response)
  return response.data
}

const verifyCodeToEnter = async (data) => {
  const response = await $host.post('/users/verify-code', data)
  return response.data
}

const forgetPasswordUpdate = async (data) => {
  const response = await $authHost.patch('/users/forget-password', data)
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
  check,
  getAllEmails,
  validateEmailToSend,
  verifyCodeToEnter,
  forgetPasswordUpdate
}