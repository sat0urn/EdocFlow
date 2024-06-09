import {Document, Page, pdfjs} from 'react-pdf'
import {useEffect, useState} from 'react'
import {allDocFormData} from "../../../data/docFormData.js";
import Loader from "../../Loader.jsx";
import {EMPLOYEE, OFFICE_MANAGER} from "../../../data/userRolesData.js";
import ProfileListEmployeeCheckbox from "../commonParts/ProfileListEmployeeCheckbox.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PDFViewer = (
  {
    isNextStep,
    searchData, userRole, employees,
    pdfTitle, pdfFile, handleSelectChange, pdfBytes,
    receiversEmail, setReceiversEmail,
    setRemark
  }
) => {
  const isEmployeeRole = userRole === EMPLOYEE
  const isOfficeManagerRole = userRole === OFFICE_MANAGER

  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const [numPages, setNumPages] = useState(null);
  const [pdfUrl, setPdfUrl] = useState('');

  const [inRemark, setInRemark] = useState('')

  const onDocumentLoadSuccess = ({numPages}) => {
    setNumPages(numPages);
  }

  useEffect(() => {
    if (pdfBytes) {
      const blob = new Blob([pdfBytes], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [pdfBytes]);

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      const filteredEmails = searchData.emails
        .filter(email => email.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filteredEmails)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setReceiversEmail([suggestion])
    setSearchTerm(suggestion)
    setSuggestions([])
  }

  const handleAddingRemark = (e) => {
    e.preventDefault()
    setRemark(inRemark)
    alert('Remark has been added!')
  }

  return (
    <div className={"card border-0 rounded-4 shadow-sm p-5"}>

      {isOfficeManagerRole &&
        <div className={"progress fw-semibold mb-3"} style={{height: '35px'}}>
          <div
            className={"progress-bar border-end"}
            role="progressbar"
            style={{width: '50%'}}
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100">STEP 1: create document
          </div>
          <div
            className={`progress-bar ${!isNextStep && 'd-none'}`}
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
            employees={employees}
            receiversEmail={receiversEmail}
            setReceiversEmail={setReceiversEmail}
          />
        </>
        :
        <>
          <div className={"d-flex align-items-center"}>
            <div className={"d-inline-flex flex-fill align-items-center"}>
              <div className={"mx-auto text-primary fs-3 fw-medium"}>
                Document: &quot;<span className={"text-decoration-underline"}>{pdfTitle}</span>&quot;
              </div>
            </div>
            <div className={"flex-fill"}>
              <select className={"form-select rounded-pill"}
                      value={pdfFile}
                      onChange={handleSelectChange}>
                {allDocFormData.map(({id, pdf, title}) =>
                  (<option key={id} value={pdf}>
                    {title}
                  </option>)
                )}
              </select>
            </div>
          </div>

          {(!isEmployeeRole && !isOfficeManagerRole) ?
            <div className={"my-3"}>
              <input
                type="text"
                className={"form-control shadow-sm rounded-pill"}
                placeholder="Enter signer / receiver's email address . . ."
                style={{fontFamily: 'Arial, FontAwesome'}}
                value={searchTerm}
                onChange={handleSearch}
              />
              {suggestions.length > 0 && (
                <ul className={"list-group position-absolute w-100 px-5 z-1"} style={{left: '0'}}>
                  {suggestions.map((email, index) => (
                    <li key={index}
                        className={"list-group-item list-group-item-action"}
                        onClick={() => handleSuggestionClick(email)}>
                      {email}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            :
            <div className={"my-2"}>
            </div>
          }

          <div className={"d-flex flex-row"}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<Loader/>}
              noData={<Loader/>}
              className={'card rounded-5 shadow-sm flex-fill'}
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
                )
              )}
            </Document>

            <form className={"ms-3"} onSubmit={handleAddingRemark}>
                      <textarea
                        className={"form-control rounded-4"}
                        rows={5}
                        value={inRemark}
                        onChange={(e) => setInRemark(e.target.value)}
                        required
                      />
              <button type={"submit"} className={"btn btn-primary mt-3 w-100"}>
                Add remark
              </button>
            </form>
          </div>
        </>
      }
    </div>
  )
}

export default PDFViewer