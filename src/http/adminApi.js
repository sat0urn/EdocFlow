import {$host} from "./index.js";

export const setAdminNotifications = async (data) => {
  const response = await $host.post('/admin/set', data)
  return response.data
}