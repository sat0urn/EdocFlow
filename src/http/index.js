import axios from 'axios'

const $authHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export {
  $authHost
}