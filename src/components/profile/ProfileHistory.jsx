import {useContext, useMemo, useState} from "react"
import {observer} from "mobx-react-lite";
import {AuthContext} from "../../context/index.js";
import HistoryTableView from "./historyParts/HistoryTableView.jsx";
import ProfileAuxWindow from "./ProfileAuxWindow.jsx";
import DocumentsPagination from "./commonParts/DocumentsPagination.jsx";

const ProfileHistory = observer(() => {
  const {user, documents} = useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState('')
  const [pages, setPages] = useState(Math.ceil(documents.history.length / 6))
  const [currentPage, setCurrentPage] = useState(0)

  const getSearchedDocuments = useMemo(() => {
    const filteredDocuments = documents.history.filter(doc => doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    )

    setPages(Math.ceil(filteredDocuments.length / 6))

    return filteredDocuments.slice(currentPage * 6, (currentPage + 1) * 6)
  }, [currentPage, documents.history, searchQuery])

  const openPdf = (fileData) => {
    // base64 (byte[]) -> buffer array
    const binaryString = atob(fileData);
    const binaryLen = binaryString.length
    const bytes = new Uint8Array(binaryLen)
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    // open pdf document
    const blob = new Blob([bytes], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);
    window.open(url)
  }

  return (
    <div className={"row"}>
      <div className={"col-lg-9"}>
        <div className={"card rounded-4 mb-5 p-4"}>
          <div className={"input-group mb-3"}>
            <div className={"d-flex align-items-center me-3"} style={{fontFamily: 'Arial, FontAwesome'}}>
              <div className={"fs-5"}>
                &#xF002;
              </div>
            </div>
            <input
              type="text"
              className={"form-control shadow-sm"}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by document name"
              style={{fontFamily: 'Arial, FontAwesome'}}
            />
          </div>
          <div className="card rounded-4">
            <HistoryTableView
              userFullName={[user._user.firstName, user._user.lastName]}
              openPdf={openPdf}
              getSearchedDocuments={getSearchedDocuments}
            />

            <DocumentsPagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </div>
      <div className={"col-lg-3"}>
        <ProfileAuxWindow/>
      </div>
    </div>
  )
})

export default ProfileHistory