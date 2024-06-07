import ProfileAuxWindow from "./commonParts/ProfileAuxWindow.jsx";
import {observer} from "mobx-react-lite";
import {useContext, useMemo, useState} from "react";
import {AuthContext} from "../../context/index.js";
import InboxTableView from "./inboxParts/InboxTableView.jsx";
import ProfilePagination from "./commonParts/ProfilePagination.jsx";
import {useLocation} from "react-router-dom";
import {ACCEPTED, COMPLETED, REJECTED, SIGNING, WAITING} from "../../data/docStatusData.js";
import PageTitle from "../PageTitle.jsx";

const ProfileInbox = observer(({title}) => {
  const {user, documents} = useContext(AuthContext)
  const currentEmail = user.user.sub

  const [searchQuery, setSearchQuery] = useState('')
  const [pages, setPages] = useState(Math.ceil(documents.inbox.length / 6))
  const [currentPage, setCurrentPage] = useState(0)

  const [filterOrder, setFilterOrder] = useState(0)

  const location = useLocation()
  const isInboxPath = location.pathname === '/inbox'

  const getSearchedDocuments = useMemo(() => {
    let filteredDocuments = isInboxPath ? documents.inbox : documents.outbox

    if (filteredDocuments) {
      filteredDocuments = filteredDocuments.filter(doc => doc.documentTitle
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      )

      switch (filterOrder) {
        case 1:
          break
        case 2:
          filteredDocuments = filteredDocuments.filter(
            doc => ((new Date().getTime() - new Date(doc.createdDate).getTime()) / (1000 * 3600 * 24)) < 7
          )
          break
        case 3:
          filteredDocuments = filteredDocuments.filter(doc =>
            doc.documentStatus === WAITING
            || doc.documentStatus === SIGNING)
          break
        case 4:
          filteredDocuments = filteredDocuments.filter(doc =>
            doc.documentStatus === REJECTED)
          break
        case 5:
          filteredDocuments = filteredDocuments.filter(doc =>
            doc.documentStatus === ACCEPTED
            || doc.documentStatus === COMPLETED)
          break
      }

      setPages(Math.ceil(filteredDocuments.length / 6))

      return filteredDocuments.slice(currentPage * 6, (currentPage + 1) * 6)
    }
  }, [currentPage, documents.inbox, documents.outbox, searchQuery, filterOrder, isInboxPath])

  return (
    <>
      <PageTitle title={title}/>
      <div className={"row"}>
        <div className={"col-lg-9"}>
          <div className={"rounded-pill bg-primary text-white d-flex justify-content-between w-50 p-3"}>
            <div>New and Active documents</div>
            <div>{getSearchedDocuments.length} in total</div>
          </div>

          <input type="text"
                 className={"form-control shadow-sm rounded-pill my-3"}
                 placeholder="&#xF002;   Search for specific document by name . . ."
                 style={{fontFamily: 'Arial, FontAwesome'}}
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
          />

          <div className={"d-flex flex-row"}>
            <button className={"btn btn-primary rounded-3 me-3 px-4"}
                    onClick={() => setFilterOrder(1)}>
              Get all
            </button>
            <button className={"btn btn-outline-primary rounded-3 me-3 px-4"}
                    onClick={() => setFilterOrder(2)}>
              All new
            </button>
            <button className={"btn btn-primary rounded-3 me-3 px-4"}
                    onClick={() => setFilterOrder(3)}>
              Requested to sign
            </button>
            <button className={"btn btn-outline-primary rounded-3 me-3 px-4"}
                    onClick={() => setFilterOrder(4)}>
              Rejected to signer
            </button>
            <button className={"btn btn-primary rounded-3 px-4"}
                    onClick={() => setFilterOrder(5)}>
              Viewed
            </button>
          </div>

          <InboxTableView
            email={currentEmail}
            searchedDocuments={getSearchedDocuments}
            isInboxPath={isInboxPath}
          />

          <ProfilePagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <div className={"col-lg-3"}>
          <ProfileAuxWindow/>
        </div>
      </div>
    </>
  )
})

export default ProfileInbox