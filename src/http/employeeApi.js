import {$authHost} from "./index.js";

const addEmployee = async (data) => {
  const response = await $authHost.post('/employee/registration', data)
  return response.data
}

const getAllEmployees = async () => {
  const response = await $authHost.get('/employee/getAll')
  return response.data
}

export {
  addEmployee,
  getAllEmployees
}