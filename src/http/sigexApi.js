import axios from "axios";
import {NCALayerClient} from "ncalayer-js-client";

const ncaLayer = new NCALayerClient()
const sigexURL = 'https://sigex.kz'

export const ncaLayerConnection = async () => {
  return await ncaLayer.connect()
}

export const ncaLayerStorageType = async () => {
  return await ncaLayer.getActiveTokens()
}

export const prepareSignature = async (storageType, dataB64) => {
  try {
    return await ncaLayer.createCMSSignatureFromBase64(
      storageType,
      dataB64
    )
  } catch (e) {
    console.error(e)
  }
}

export const registerSignature = async (
  pdfName, description, signature
) => {
  try {
    const response = await axios.post(
      `${sigexURL}/api`,
      {
        title: pdfName,
        description: description,
        signature
      }
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const addDocHash = async (documentId, dataB64) => {
  const dataToSend = Uint8Array.from(
    atob(dataB64),
    c => c.charCodeAt(0)
  ).buffer

  try {
    const response = await axios.post(
      `${sigexURL}/api/${documentId}/data`,
      dataToSend,
      {headers: {'Content-Type': 'application/octet-stream'}}
    )

    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const addAnotherSign = async (documentId, signature) => {
  try {
    await axios.post(
      `${sigexURL}/api/${documentId}`,
      {
        signType: 'cms',
        signature
      },
      {headers: {'Content-Type': 'application/json'}}
    )
  } catch (e) {
    console.error(e)
  }
}

export const buildDDC = async (documentId, pdfName, dataB64) => {
  console.log(dataB64)
  const dataToSend = Uint8Array.from(
    atob(dataB64.replace(/-/g, "+").replace(/_/g, "/")),
    c => c.charCodeAt(0)
  ).buffer

  try {
    const urlBuildDDC = `${sigexURL}/api/${documentId}/buildDDC?fileName=${pdfName}.pdf&language=ru`
    const response = await axios.post(
      urlBuildDDC,
      dataToSend,
      {headers: {'Content-Type': 'application/octet-stream'}}
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const parseDDC = async (fileData) => {
  const dataToSend = Uint8Array.from(
    atob(fileData),
    c => c.charCodeAt(0)
  ).buffer;
  try {
    const response = await axios.post(
      `${sigexURL}/api/parseDDC?registerUnknownSignatures=true`,
      dataToSend,
      {headers: {'Content-Type': 'application/octet-stream'}}
    )
    return response.data
  } catch (e) {
    console.error(e)
  }
}