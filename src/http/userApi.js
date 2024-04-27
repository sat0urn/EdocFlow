import {
  $authHost
} from "./index";

const registration = async (
  email,
  name,
  surName,
  phoneNumber,
  password,
  country,
  city
) => {
  const response = await $authHost.post(
    '/user/registration', {
      email,
      name,
      surName,
      phoneNumber,
      password,
      country,
      city
    })
  return response
}

const login = async (email, password) => {
  const response = await $authHost.post(
    '/user/login', {
      email,
      password
    })
  console.log(response)
  return response
}

export {
  registration,
  login
}