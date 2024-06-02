import {Link} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/index.js";
import {observer} from "mobx-react-lite";
import Notification from "../../assets/icons/notification.svg"

const ProfileSearchAndAccount = observer(() => {
  const {user, documents} = useContext(AuthContext)

  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    if (value.length > 0) {
      const filteredEmails = documents.history
        .filter(doc =>
          doc.name.toLowerCase().includes(value.toLowerCase())
        )
      setSuggestions(filteredEmails)
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name)
    openPdf(suggestion.fileData)
    setSuggestions([])
  }

  const openPdf = (fileData) => {
    const binaryString = atob(fileData);
    const binaryLen = binaryString.length
    const bytes = new Uint8Array(binaryLen)
    for (let i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }

    const blob = new Blob([bytes], {type: "application/pdf"});
    const url = URL.createObjectURL(blob);
    window.open(url)
  }

  return (
    <div className={"container my-4"}>
      <div className={"row row-cols-2"}>
        <div className={"col-9"}>
          <div>
            <input type="text"
                   className={"form-control shadow-sm rounded-pill"}
                   placeholder="&#xF002;   Search your documents. . ."
                   style={{fontFamily: 'Arial, FontAwesome'}}
                   value={searchTerm}
                   onChange={handleSearch}
            />
            {suggestions.length > 0 && (
              <ul className={"list-group position-absolute w-50 z-1"}>
                {suggestions.map((doc, index) => (
                  <li key={index}
                      className={"list-group-item list-group-item-action"}
                      onClick={() => handleSuggestionClick(doc)}>
                    <div className={"d-flex flex-row justify-content-between"}>
                      <div>{doc.name}</div>
                      <div>[{doc.createdTime.split('T')[0]}]</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={"col-3 d-flex flex-row"}>
          <div className={"me-3"}>
            <Link to="#"
                  className={"bg-white shadow rounded-circle text-decoration-none d-inline-flex align-items-center justify-content-center"}
                  style={{width: '40px', height: '40px'}}>
              <img src={Notification} className={"img-fluid"} alt="notification"/>
            </Link>
          </div>
          <div className={"border-start border-2 ps-3"}>
            <Link to="/security" className={"text-decoration-none"}>
              <div className={"d-inline-flex shadow rounded-circle align-items-center justify-content-center me-3"}
                   style={{width: '40px', height: '40px'}}>
                <i className="fa-regular fa-user text-black"></i>
              </div>
              <span className={"fw-bold link-body-emphasis"}>
                {user._user.firstName + ' ' + user._user.lastName}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
})

export default ProfileSearchAndAccount