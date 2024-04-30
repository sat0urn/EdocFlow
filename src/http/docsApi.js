import {$authHost} from "./index";

const upload = async (formData) => {
  return await $authHost.post(
      '/upload',
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
}

const fetchDocuments = async () => {
  return await $authHost.get('/documents')
}

export {
  upload,
  fetchDocuments
}