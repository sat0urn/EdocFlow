import {
  $authHost
} from "./index";

const upload = async (formData) => {
  const response = await $authHost.post(
    '/upload',
    formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  return response
}

const fetchDocuments = async () => {
  const response = await $authHost.get('/documents')
  console.log(response);
  return response
}

export {
  upload,
  fetchDocuments
}