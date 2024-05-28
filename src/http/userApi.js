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
  const {data} = await $host.post(
    '/users/login',
    {email, password}
  )
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

const registerBusiness = async (
  businessForm
) => {
  const {data} = await $host.post('/users/registerBusiness', businessForm)
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

const getAllEmails = async () => {
  const response = await $authHost.get(
    '/users/getAllEmails'
  )
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
  registerBusiness,
  updatePassword,
  check,
  getAllEmails
}