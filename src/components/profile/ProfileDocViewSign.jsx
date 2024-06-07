import {Link, useNavigate, useParams} from "react-router-dom";
import ProfileAuxWindow from "./commonParts/ProfileAuxWindow.jsx";
import {Document, Page} from "react-pdf";
import {useContext, useEffect, useState} from "react";
import {getInboxById, rejectInboxDocument, signInboxDocument, updateInboxReceivers} from "../../http/docsApi.js";
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
import PageTitle from "../PageTitle.jsx";
import {REJECTED, SIGNING} from "../../data/docStatusData.js";
import {EMPLOYEE, OFFICE_MANAGER} from "../../data/userRolesData.js";
import ProfileListEmployeeCheckbox from "./commonParts/ProfileListEmployeeCheckbox.jsx";

const ProfileDocViewSign = observer(({title}) => {
  const {user, documents, fetchChanges} = useContext(AuthContext)
  const navigate = useNavigate()

  const currentEmail = user.user.sub
  const employees = user.employees
  const [receiversEmail, setReceiversEmail] = useState([])
  const isEmployeeRole = user.role === EMPLOYEE
  const isRoleOfficeManager = user.role === OFFICE_MANAGER

  const [isNextStep, setIsNextStep] = useState(false)

  const {id} = useParams()

  const [pdfFile, setPdfFile] = useState(null)
  const [documentData, setDocumentData] = useState({})
  const [senderInfo, setSenderInfo] = useState({})
  const [documentStatus, setDocumentStatus] = useState('')
  const [remark, setRemark] = useState('')
  const [inRemark, setInRemark] = useState('')

  const [numPages, setNumPages] = useState(null);

  const [connecting, setConnecting] = useState(true)
  const [ncaLayerNotAvailable, setNcaLayerNotAvailable] = useState(false)
  const [awaitingSignature, setAwaitingSignature] = useState(false)
  const [fullConnection, setFullConnection] = useState(true)

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
            setStorageType(storageTypes.length === 0 ? 'PKCS12' : storageTypes[0])
            console.log("Storage type selected")
          })
          .catch((e) => console.error(e))
      })
      .catch(() => setNcaLayerNotAvailable(true))
      .finally(() => setFullConnection(false))
  }, [])

  useEffect(() => {
    getInboxById(id)
      .then((data) => {
        const pdfBytes = base64ToArrayBuffer(data.documentDto.fileData)
        const blob = new Blob([pdfBytes], {type: 'application/pdf'});
        const url = URL.createObjectURL(blob);

        const yourBox = data.receivers.find(r => r.userEmail === currentEmail)

        setPdfFile(url)
        setDocumentData(data.documentDto)
        setSenderInfo(data.sender)
        setDocumentStatus(yourBox.documentStatus ? yourBox.documentStatus : '')

        return () => URL.revokeObjectURL(url);
      })
      .catch((e) => console.error(e))
  }, [id])

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages)
  }

  const handleSignDocument = async () => {

    if (receiversEmail.length === 0) {
      alert('Choose employee(-s) that need to sign the document!')
      return
    }

    if (ncaLayerNotAvailable) {
      alert("Connect to NCALayer")
      return
    }

    setAwaitingSignature(true)
    let signature, data

    try {
      data = await parseDDC(documentData.fileData)
      console.log('Document has parsed successfully!')
    } catch (e) {
      console.error(e)
      setAwaitingSignature(false)
      return
    }

    if (data.documentId) {
      try {
        signature = await prepareSignature(storageType, data.document)
      } catch (e) {
        alert('Action was cancelled by user');
        setAwaitingSignature(false)
        return
      }
      console.log('signature prepared')

      try {
        await addAnotherSign(data.documentId, signature)
      } catch (e) {
        console.error(e)
        setAwaitingSignature(false)
        return
      }
      console.log('another sign has been added')

      try {
        data = await buildDDC(data.documentId, documentData.name, data.document)
      } catch (e) {
        console.error(e)
        setAwaitingSignature(false)
        return
      }
      console.log(data)

      if (data.ddc) {
        if (!isRoleOfficeManager) {
          signInboxDocument({
            employeesEmail: receiversEmail,
            fileData: data.ddc,
            inboxId: id
          })
            .then(() => {
              fetchChanges.toggleIsChanged()
              navigate('/inbox')
            })
            .catch((e) => {
              alert('Something went wrong')
              console.error(e)
            })
        } else {
          updateInboxReceivers(id, {emails: receiversEmail})
            .then((data) => {
              console.log(data)
              fetchChanges.toggleIsChanged()
              navigate('/inbox')
            })
            .catch((e) => {
              alert('Something went wrong')
              console.error(e)
            })
        }
      }
    }
    setAwaitingSignature(false)
  }

  const handleRejectDocument = () => {
    if (inRemark) {
      rejectInboxDocument({
        inboxId: id,
        reasonToReject: inRemark
      }).then(() => {
        navigate('/inbox')
        fetchChanges.toggleIsChanged()
      }).catch((e) => {
        alert('Something went wrong')
        console.error(e)
      })
    } else {
      alert('Please fill the rejection remark!')
    }
  }


  const reloadPage = () => {
    window.location.reload()
  }

  if (!senderInfo || fullConnection) {
    return <>
      <PageTitle title={title}/>
      <Loader/>
    </>
  }

  return (
    <>
      <PageTitle title={title}/>
      <div className={"row"}>
        <div className={"col-lg-9"}>
          <Link to={(currentEmail === senderInfo.email) ? '/outbox' : '/inbox'}
                className={"rounded-pill bg-primary d-inline-flex align-items-center p-2 text-decoration-none"}>
            <div className={"bg-white shadow rounded-circle d-inline-flex align-items-center justify-content-center"}
                 style={{width: '40px', height: '40px'}}>
              <i className={"fa-solid fa-arrow-left"}></i>
            </div>
            <div className={"text-white mx-4"}>
              Return to <span>{(currentEmail === senderInfo.email) ? 'Outbox' : 'Inbox'}</span>
            </div>
          </Link>
          <div className={"card border-0 rounded-4 shadow-sm p-5 my-4"}>
            {isRoleOfficeManager &&
              <div className={"progress fw-semibold mb-3"} style={{height: '35px'}}>
                <div className={"progress-bar border-end"}
                     role="progressbar"
                     style={{width: '50%'}}
                     aria-valuenow="50"
                     aria-valuemin="0"
                     aria-valuemax="100">STEP 1: create document
                </div>
                <div className={`progress-bar ${!isNextStep && 'd-none'}`}
                     role="progressbar"
                     style={{width: '50%'}}
                     aria-valuenow="50"
                     aria-valuemin="0"
                     aria-valuemax="100">STEP 2: assign and send
                </div>
              </div>
            }

            {isNextStep ?
              <>
                <ProfileListEmployeeCheckbox
                  senderEmail={senderInfo.email}
                  employees={employees}
                  receiversEmail={receiversEmail}
                  setReceiversEmail={setReceiversEmail}
                />
                <ul className={"list-group mb-4"}>
                  <li className={"list-group-item"}>Distribution by employees:</li>
                  {receiversEmail.map((email, index) =>
                    <li key={index} className={"list-group-item"}>{email}</li>)}
                </ul>
                {!awaitingSignature ?
                  <button
                    className={"btn btn-success w-100"}
                    onClick={handleSignDocument}
                  >
                    Assign and Send
                  </button>
                  :
                  <button
                    type={"button"}
                    className={"btn btn-success w-100"}
                    disabled
                  >
                    <span className={"spinner-border spinner-border-sm"}></span>
                  </button>
                }
                {receiversEmail.length === 0 &&
                  <button
                    type={'button'}
                    className={"btn btn-primary w-100 mt-2"}
                    onClick={() => setIsNextStep(false)}
                  >
                    Previous Step
                  </button>
                }
              </>
              :
              <>
                {(documentStatus === REJECTED) && (currentEmail === senderInfo.email) ?
                  <div className={"fw-light opacity-75 text-center"}>
                    <div className={"text-danger"}>
                      Rejected <br/>
                    </div>
                    <div>
                      Reason: {senderInfo.remark}
                    </div>
                  </div>
                  :
                  <div className={"text-secondary fw-light opacity-50 text-center"}>
                    {documentData.name} was created by {senderInfo.firstName + ' ' + senderInfo.lastName}
                  </div>
                }
                <hr/>
                <div className={"d-flex flex-row"}>
                  <div className={"document-pdf-component vh-100 overflow-y-auto card rounded-0 shadow-sm flex-fill"}>
                    <Document
                      file={pdfFile}
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
                            className={"my-5"}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        ))}
                    </Document>
                  </div>

                  {(documentStatus === SIGNING && currentEmail !== senderInfo.email) &&
                    <div className={"ms-3"}>
                      {(ncaLayerNotAvailable || fullConnection) ?
                        <div className={"text-center"}>
                          <div className={"text-danger small my-3"}>
                            Failed to detect <strong>NCALayer</strong>
                          </div>
                          <div className={"card p-2 small"}>
                            NCALayer is required
                          </div>
                          <button
                            type={"button"}
                            className={"btn btn-outline-danger w-100 mt-3"}
                            onClick={reloadPage}
                          >
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
                                <div className={"w-100 text-center"}>Connecting to NCALayer...</div>
                              </div>
                            </div>
                            :
                            (!awaitingSignature ?
                                <>
                                  <textarea
                                    className={"form-control rounded-4"}
                                    rows={5}
                                    placeholder={'To reject the document, type your remark!'}
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                  />
                                  {remark ?
                                    <>
                                      <button
                                        className={"btn btn-primary mt-3 w-100"}
                                        onClick={() => {
                                          setInRemark(remark)
                                          alert('Remark has been added!')
                                        }}
                                      >
                                        Add remark
                                      </button>
                                      <button
                                        className={"btn btn-danger w-100 mt-2"}
                                        onClick={handleRejectDocument}
                                      >
                                        Reject
                                      </button>
                                    </>
                                    :
                                    <div className={"mt-3"}>
                                      {isNextStep || !isRoleOfficeManager ?
                                        <>
                                          <button
                                            type={handleSignDocument}
                                            className={"btn btn-primary w-100 rounded-4 mt-3"}
                                          >
                                            Sign and Send
                                          </button>
                                        </>
                                        :
                                        <>
                                          <button
                                            type={'button'}
                                            className={"btn btn-primary w-100"}
                                            onClick={() => setIsNextStep(true)}
                                          >
                                            Next Step
                                          </button>
                                        </>
                                      }
                                    </div>
                                  }
                                </>
                                :
                                <button
                                  type={"button"}
                                  className={"btn btn-primary w-100 mt-3"}
                                  disabled
                                >
                                  <span className={"spinner-border spinner-border-sm"}></span>
                                </button>
                            )
                        )
                      }
                    </div>
                  }
                </div>
              </>
            }
          </div>
        </div>
        <div className="col-lg-3">
          <ProfileAuxWindow/>
        </div>
      </div>
    </>
  )
})

export default ProfileDocViewSign