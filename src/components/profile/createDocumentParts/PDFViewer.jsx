import {Document, Page, pdfjs} from 'react-pdf'
import {useContext, useEffect, useState} from 'react'
import {allDocFormData} from "../../../data/docFormData.js";
import Loader from "../../Loader.jsx";
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../../context/index.js";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const PDFViewer = observer((
  {
    pdfTitle, pdfFile, handleSelectChange, pdfBytes,
    setReceiverEmail,
    setRemark
  }
) => {
  const {searchData, user} = useContext(AuthContext)

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
      // Create a blob URL for the pdfBytes
      const blob = new Blob([pdfBytes], {type: 'application/pdf'});
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);

      // Clean up the blob URL after it's been used
      return () => URL.revokeObjectURL(url);
    }
  }, [pdfBytes]);

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      const filteredEmails = searchData.emails
        .filter(email =>
          email.toLowerCase().includes(value.toLowerCase()) &&
          email !== user._user.sub
        )
      setSuggestions(filteredEmails)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setReceiverEmail(suggestion)
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
      <div className={"d-flex align-items-center"}>
        <div className={"flex-fill"}>
          <div className={"text-primary fs-3 fw-medium"}>
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

      <div className={""}>
        <input type="text"
               className={"form-control shadow-sm rounded-pill my-3"}
               placeholder="Enter signer / receiver's email address . . ."
               style={{fontFamily: 'Arial, FontAwesome'}}
               value={searchTerm}
               onChange={handleSearch}
        />
        {suggestions.length > 0 && (
          <ul className={"list-group position-absolute w-100 px-5 z-1"}
              style={{left: '0'}}>
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

      <div className={"d-flex flex-row"}>
        <Document file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={<Loader/>}
                  noData={<Loader/>}
                  className={'card rounded-5 shadow-sm flex-fill'}>
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
          <textarea className={"form-control rounded-4"}
                    rows={5}
                    value={inRemark}
                    onChange={(e) => setInRemark(e.target.value)}
          />
          <button type={"submit"}
                  className={"btn btn-primary mt-3 w-100"}>
            Add remark
          </button>
        </form>
      </div>
    </div>
  )
})

export default PDFViewer