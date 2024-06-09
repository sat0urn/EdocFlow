import {$authHost} from "./index";

const createInbox = async (data) => {
  const response = await $authHost.post(
    '/inbox/create',
    {
      name: data.pdfName,
      fileData: data.fileData,
      remark: data.remark,
      receiversEmail: data.receiversEmail
    },
    {headers: {'Content-Type': 'application/json'}}
  )
  return response
}

const updateInboxReceivers = async (inboxId, data) => {
  const response = await $authHost.post(`/inbox/update/${inboxId}`, data)
  return response.data;
}

const getAllInboxes = async () => {
  const response = await $authHost.get('/inbox/getAll')
  return response.data
}

const getAllOutboxes = async () => {
  const response = await $authHost.get('/outbox/getAll')
  return response.data
}

const getInboxById = async (inboxId) => {
  const response = await $authHost.get(`/inbox/get/${inboxId}`)
  return response.data
}

const signInboxDocument = async (data) => {
  const response = await $authHost.post('/inbox/sign', data)
  return response.data
}

const rejectInboxDocument = async (data) => {
  const response = await $authHost.post('/inbox/reject', data)
  return response.data
}

const deleteInboxById = async (inboxId) => {
  const response = await $authHost.delete(`/inbox/delete/${inboxId}`)
  return response.data
}

const deleteOutboxById = async (outboxId) => {
  const response = await $authHost.delete(`/outbox/delete/${outboxId}`)
  return response.data
}

const getAllHistory = async () => {
  const response = await $authHost.get('/document/getAll')
  return response.data
}

export {
  getAllHistory,
  createInbox,
  updateInboxReceivers,
  getAllInboxes,
  getAllOutboxes,
  getInboxById,
  deleteInboxById,
  deleteOutboxById,
  signInboxDocument,
  rejectInboxDocument
}