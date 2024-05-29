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

const PDFEditor = (
  {
    formData, handleInputChange, updatedPdfBytes, pdfFile,
    remark,
    receiverEmail
  }
) => {
  const [connecting, setConnecting] = useState(true)
  const [ncaLayerNotAvailable, setNcaLayerNotAvailable] = useState(false)
  const description = 'Sign document process based on EDOC-FLOW platform'

  const [storageType, setStorageType] = useState(null)
  const [awaitingSignature, setAwaitingSignature] = useState(false)

  const [pdfName, setPdfName] = useState('')
  const [dataB64, setDataB64] = useState(null)

  useEffect(() => {
    if (updatedPdfBytes) {
      setDataB64(arrayBufferToBase64(updatedPdfBytes))
      console.log('updatedPdfBytes')
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
            setStorageType(storageTypes.length === 0 ?
              'PKCS12' : storageTypes[0])
            console.log("Storage type selected")
          })
          .catch((e) => console.error(e))
      })
      .catch(() => setNcaLayerNotAvailable(true))
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
      console.error(e)
      return
    }
    console.log('signature prepared')

    data = await registerSignature(pdfName, description, signature)
    if (data.message) {
      console.log('wrong registration signature process')
      return
    }
    console.log('signature registered')

    const documentId = data.documentId

    data = await addDocHash(documentId, dataB64)
    if (data.message) {
      console.log('wrong adding document hash part to archive')
      return
    }
    console.log('document hash part added')

    setAwaitingSignature(false)
    return documentId
  }

  const handleSignDocument = async (e) => {
    e.preventDefault()
    const documentId = await documentSignPreparation()
    console.log(documentId)

    const data = await buildDDC(documentId, pdfName, dataB64)
    if (data.ddc) {
      createInbox({pdfName, fileData: data.ddc, remark, receiverEmail})
        .then(data => {
          console.log(data)
          window.location.reload()
          alert('Document has been signed and sent successfully!')
        })
        .catch((e) => {
          console.error(e)
        })
    } else {
      alert("Something went wrong, try again!")
    }
  }

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <>
      <form onSubmit={handleSignDocument}>
        {Object.entries(formData).map(([key, {name, value}]) => {
          return (
            <div key={key} className="mb-2">
              <label className="form-label opacity-75">
                {name}
              </label>
              <input
                type="text"
                name={key}
                className="form-control form-control-sm rounded-2 border-0 shadow-sm"
                value={value}
                onChange={handleInputChange}
                required
              />
            </div>
          )
        })}
        {receiverEmail ?
          (ncaLayerNotAvailable ?
            <div className={"text-center"}>
              <div className={"text-danger mb-3"}>
                Failed to detect <strong>NCALayer</strong>.
              </div>
              <div className={"card p-2"}>
                NCALayer is required for signing digital signature documents (ЭЦП).
              </div>
              <button type={"button"}
                      className={"btn btn-outline-danger w-100 mt-3"}
                      onClick={reloadPage}>
                Reload the page and try again
              </button>
            </div>
            :
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
                <button type={'submit'}
                        className="btn btn-primary w-100 rounded-4 mt-3"
                >
                  Sign and Send
                </button>
                :
                <button type={"button"}
                        className={"btn btn-primary w-100 rounded-4 mt-3"}
                        disabled
                >
                  <span
                    className={"spinner-border spinner-border-sm"}></span>
                </button>)))
          :
          <div className={"text-center text-danger mt-4"}>
            Receiver email must be added
          </div>
        }
      </form>
    </>
  )
}

export default PDFEditor