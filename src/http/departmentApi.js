import {$host} from "./index.js";
import {jwtDecode} from "jwt-decode";

const registerBusiness = async (businessData, userData) => {
  businessData.companyManager = userData
  const {data} = await $host.post(`/department/create`, businessData)
  localStorage.setItem('token', data.token)
  return jwtDecode(data.token)
}

export {
  registerBusiness
}
