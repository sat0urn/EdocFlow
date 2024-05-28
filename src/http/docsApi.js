import {$authHost} from "./index";

const upload = async (
  formData
) => {
  const response = await $authHost.post(
    '/documents/upload',
    formData,
    {headers: {'Content-Type': 'multipart/form-data'}}
  )
  return response
}

const createInbox = async (
  data
) => {
  const response = await $authHost.post(
    '/inbox/create',
    {
      name: data.pdfName,
      fileData: data.fileData,
      remark: data.remark,
      receiverEmail: data.receiverEmail
    },
    {headers: {'Content-Type': 'application/json'}}
  )
  console.log(response)
  return response
}

const getAllInboxes = async () => {
  const response = await $authHost.get('/inbox/getAll')
  return response.data
}

const getInboxById = async (
  inboxId
) => {
  const response = await $authHost.get(
    `/inbox/get/${inboxId}`
  )
  return response.data
}

const signInboxDocument = async (
  data
) => {
  const response = await $authHost.post(
    '/inbox/sign',
    data
  )
  return response
}

const rejectInboxDocument = async (
  data
) => {
  const response = await $authHost.post(
    '/inbox/reject',
    data
  )
  return response
}

const getAllHistory = async () => {
  const response = await $authHost.get('/documents')
  return response.data
}

export {
  upload,
  getAllHistory,
  createInbox,
  getAllInboxes,
  getInboxById,
  signInboxDocument,
  rejectInboxDocument
}