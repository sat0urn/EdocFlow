import {Link, useLocation, useNavigate} from "react-router-dom";
import ProfileAuxWindow from "./ProfileAuxWindow.jsx";
import {Document, Page} from "react-pdf";
import {useContext, useEffect, useState} from "react";
import {getInboxById, rejectInboxDocument, signInboxDocument} from "../../http/docsApi.js";
import Loader from "../Loader.jsx";
import {
  addAnotherSign,
  buildDDC,
  ncaLayerConnection,
  ncaLayerStorageType,
  parseDDC,
  prepareSignature
} from "../../http/sigexApi.js";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";

const ProfileDocViewSign = observer(() => {
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const location = useLocation()
  const searchURL = new URLSearchParams(location.search)
  const id = searchURL.get('id')
  const status = searchURL.get('status')

  const [pdfFile, setPdfFile] = useState(null)
  const [documentData, setDocumentData] = useState({})
  const [senderInfo, setSenderInfo] = useState({})
  const [remark, setRemark] = useState('')
  const [inRemark, setInRemark] = useState('')

  const [numPages, setNumPages] = useState(null);

  const [connecting, setConnecting] = useState(true)
  const [ncaLayerNotAvailable, setNcaLayerNotAvailable] = useState(false)
  const [awaitingSignature, setAwaitingSignature] = useState(false)

  const [storageType, setStorageType] = useState(null)

  const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++)
      bytes[i] = binaryString.charCodeAt(i);

    return bytes.buffer;
  };

  useEffect(() => {
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

  useEffect(() => {
    getInboxById(id)
      .then((data) => {
        console.log(data)
        const pdfBytes = base64ToArrayBuffer(data.pdfDocumentDto.fileData)
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);
        setPdfFile(url)
        setDocumentData(data.pdfDocumentDto)
        setSenderInfo({
          firstName: data.sender.firstName,
          lastName: data.sender.lastName,
          email: data.sender.email,
          rejectedReason: data.remark
        })
        return () => URL.revokeObjectURL(url);
      })
      .catch((e) => console.log(e))
  }, [id])

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages)
  }

  const signDocument = async () => {
    let signature
    const data = await parseDDC(documentData.fileData)
    console.log('Document has parsed successfully!')

    if (data.documentId) {
      setAwaitingSignature(true)
      try {
        signature = await prepareSignature(storageType, data.document)
      } catch (e) {
        console.error(e)
        return
      }
      console.log('signature prepared')

      await addAnotherSign(data.documentId, signature)
      console.log('another sign has been added')

      const buildUpdatedDDC = await buildDDC(
        data.documentId,
        documentData.name,
        data.document
      )

      console.log(buildUpdatedDDC)

      if (buildUpdatedDDC.ddc) {
        signInboxDocument({
          fileData: buildUpdatedDDC.ddc,
          inboxId: id
        }).then(() => {
          navigate('/inbox')
          window.location.reload()
        }).catch((e) => {
          alert('Something went wrong')
          console.error(e)
        })
      } else {
        alert('Something went wrong')
      }
      setAwaitingSignature(false)
    }
  }

  const rejectDocument = () => {
    rejectInboxDocument({
      inboxId: id,
      reasonToReject: inRemark
    }).then(() => {
      navigate('/inbox')
      window.location.reload()
    }).catch((e) => {
      alert('Something went wrong')
      console.error(e)
    })
  }

  const reloadPage = () => {
    window.location.reload()
  }

  return (
    <div className={"row"}>
      <div className={"col-lg-9"}>
        <Link to={(user.user.sub === senderInfo.email) ? '/outbox' : '/inbox'}
              className={"rounded-pill bg-primary d-inline-flex align-items-center p-2 text-decoration-none"}>
          <div className={"bg-white shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
               style={{width: '40px', height: '40px'}}>
            <i className={"fa-solid fa-arrow-left"}></i>
          </div>
          <div className={"text-white mx-4"}>
            Return to <span>{(user.user.sub === senderInfo.email) ? 'Outbox' : 'Inbox'}</span>
          </div>
        </Link>
        <div className={"card border-0 rounded-4 shadow-sm p-5 my-4"}>
          {(status === 'REJECTED') ?
            ((user.user.sub === senderInfo.email) &&
              <div className={"fw-light opacity-75 text-center"}>
                <div className={"text-danger"}>
                  Rejected <br/>
                </div>
                <div>
                  Reason: {senderInfo.rejectedReason}
                </div>
              </div>)
            :
            <div className={"text-secondary fw-light opacity-50 text-center"}>
              {documentData.name} was created by {senderInfo.firstName + ' ' + senderInfo.lastName}
            </div>
          }
          <hr/>
          <div className={"d-flex flex-row"}>
            <div className={"overflow-y-auto card rounded-5 shadow-sm flex-fill"}
                 style={{height: '650px'}}>
              <Document file={pdfFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<Loader/>}
                        noData={<Loader/>}
              >
                {Array.from(
                  new Array(numPages),
                  (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                      className="my-5 rounded-5"
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  ))}
              </Document>
            </div>

            {(status === 'OnPROCESS' && (user._user.sub !== senderInfo.email)) &&
              <div className={"ms-3"}>
                  <textarea className={"form-control rounded-4"}
                            rows={5}
                            placeholder={'Please justify your rejection!'}
                            value={remark}
                            onChange={(e) => setRemark(e.target.value)}
                  />
                {remark &&
                  <button className={"btn btn-primary mt-3 w-100"}
                          onClick={() => {
                            setInRemark(remark)
                            alert('Remark has been added!')
                          }}
                  >
                    Add remark
                  </button>
                }

                {ncaLayerNotAvailable ?
                  <div className={"text-center"}>
                    <div className={"text-danger small my-3"}>
                      Failed to detect <strong>NCALayer</strong>
                    </div>
                    <div className={"card p-2 small"}>
                      NCALayer is required
                    </div>
                    <button type={"button"}
                            className={"btn btn-outline-danger w-100 mt-3"}
                            onClick={reloadPage}>
                      <span className={"small"}>
                        Reload the page
                      </span>
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
                      <div className={"mt-3"}>
                        {!remark ?
                          <button className={"btn btn-success w-100"}
                                  onClick={signDocument}>
                            Sign
                          </button>
                          :
                          <button className={"btn btn-danger w-100"}
                                  onClick={rejectDocument}>
                            Reject
                          </button>
                        }
                      </div>
                      :
                      <button type={"button"}
                              className={"btn btn-primary w-100 rounded-4 mt-3"}
                              disabled>
                        <span
                          className={"spinner-border spinner-border-sm"}></span>
                      </button>))
                }
              </div>
            }
          </div>
        </div>
      </div>
      <div className="col-lg-3">
        <ProfileAuxWindow/>
      </div>

    </div>
  )
})

export default ProfileDocViewSign