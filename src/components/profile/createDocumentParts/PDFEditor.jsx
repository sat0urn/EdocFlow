import {useEffect, useState} from "react";
import {
  addDocHash,
  buildDDC,
  ncaLayerConnection,
  ncaLayerStorageType,
  prepareSignature,
  registerSignature
} from "../../../http/sigexApi.js";
import {createInbox} from "../../../http/docsApi.js";
import Loader from "../../Loader.jsx";

const PDFEditor = (
  {
    formData, handleInputChange, updatedPdfBytes, pdfFile,
    remark,
    receiverEmail
  }
) => {
  const [connecting, setConnecting] = useState(true)
  const [ncaLayerNotAvailable, setNcaLayerNotAvailable] = useState(false)
  const [fullConnection, setFullConnection] = useState(true)
  const description = 'Sign document process based on EDMS platform'

  const [storageType, setStorageType] = useState(null)
  const [awaitingSignature, setAwaitingSignature] = useState(false)

  const [pdfName, setPdfName] = useState('')

  const [dataB64, setDataB64] = useState(null)

  useEffect(() => {
    if (updatedPdfBytes) {
      setDataB64(arrayBufferToBase64(updatedPdfBytes))
    }
  }, [updatedPdfBytes])

  useEffect(() => {
    setPdfName(pdfFile.substring(pdfFile.lastIndexOf("/") + 1, pdfFile.length - 4))

    ncaLayerConnection()
      .then(() => {
        setConnecting(false)
        console.log("Connection established")
        ncaLayerStorageType()
          .then((storageTypes) => {
            setStorageType(storageTypes.length === 0 ? 'PKCS12' : storageTypes[0])
            console.log("Storage type selected")
          })
          .catch((e) => console.error(e))
      })
      .catch(() => setNcaLayerNotAvailable(true))
      .finally(() => setFullConnection(false))
  }, [])

  const arrayBufferToBase64 = (arrayBuffer) => {
    let binary = ''
    const len = arrayBuffer.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(arrayBuffer[i])
    }
    return window.btoa(binary)
  }

  const documentSignPreparation = async () => {
    setAwaitingSignature(true)
    let signature, data

    try {
      signature = await prepareSignature(storageType, dataB64)
    } catch (e) {
      alert('Action was cancelled by user');
      setAwaitingSignature(false)
      return
    }
    console.log('signature prepared')

    try {
      data = await registerSignature(pdfName, description, signature)
    } catch (e) {
      console.log(e)
      setAwaitingSignature(false)
      return
    }
    if (data.message) {
      console.log('wrong registration signature process')
      setAwaitingSignature(false)
      return
    }
    console.log('signature registered')

    const documentId = data.documentId

    try {
      data = await addDocHash(documentId, dataB64)
    } catch (e) {
      console.log(e)
      setAwaitingSignature(false)
      return
    }
    if (data.message) {
      console.log('wrong adding document hash part to archive')
      setAwaitingSignature(false)
      return
    }
    console.log('document hash part added')

    setAwaitingSignature(false)
    return documentId
  }

  const handleSignDocument = async (e) => {
    e.preventDefault()
    if (ncaLayerNotAvailable) {
      alert("Connect to NCALayer")
      return
    }

    const documentId = await documentSignPreparation()
    console.log(documentId)

    let data
    try {
      data = await buildDDC(documentId, pdfName, dataB64)
    } catch (e) {
      console.log(e)
      return
    }

    if (data.ddc) {
      createInbox({pdfName, fileData: data.ddc, remark, receiversEmail: [receiverEmail]})
        .then(data => {
          console.log(data)
          window.location.reload()
          alert('Document has been signed and sent successfully!')
        })
        .catch((e) => {
          console.error(e)
        })
    }
  }

  const reloadPage = () => {
    window.location.reload()
  }

  if (fullConnection) {
    return <Loader/>
  }

  return (
    <>
      <form onSubmit={handleSignDocument}>
        {!ncaLayerNotAvailable &&
          (Object.entries(formData).map(([key, {type, name, value}]) => {
            return (
              <div key={key} className="mb-2">
                <label className="form-label opacity-75">
                  {name}
                </label>
                <input
                  type={type}
                  name={key}
                  className="form-control form-control-sm rounded-2 border-0 shadow-sm"
                  value={value}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )
          }))
        }
        {ncaLayerNotAvailable || fullConnection ?
          <div className={"text-center"}>
            <div className={"text-danger mb-3"}>
              Failed to detect <strong>NCALayer</strong>
            </div>
            <div className={"card p-2 border-0 shadow-sm"}>
              NCALayer is required for signing with digital signature documents (ЭЦП)
            </div>
            <button type={"button"}
                    className={"btn btn-outline-danger w-100 mt-3"}
                    onClick={reloadPage}>
              Reload the page and try again
            </button>
          </div>
          :
          (receiverEmail ?
            (connecting ?
              <div className={"row justify-content-center"}>
                <div className="col-md-auto">
                  <div className="d-flex justify-content-center">
                    <div className={"spinner-grow"}></div>
                  </div>
                  <p>Connecting to NCALayer...</p>
                </div>
              </div>
              :
              (!awaitingSignature ?
                <button type={'submit'} className="btn btn-primary w-100 rounded-4 mt-3">
                  Sign and Send
                </button>
                :
                <button type={"button"} className={"btn btn-primary w-100 rounded-4 mt-3"} disabled>
                  <span className={"spinner-border spinner-border-sm"}></span>
                </button>))
            :
            <div className={"text-center"}>
              <div className={"text-danger my-4"}>
                Receiver email must be added
              </div>
              <div className={"text-success"}>
                <strong>NCALayer</strong> connection is established!
              </div>
            </div>)
        }
      </form>
    </>
  )
}

export default PDFEditor