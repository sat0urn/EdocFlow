import {Outlet} from "react-router-dom"
import ProfileSideMenu from "../components/profile/commonParts/ProfileSideMenu.jsx";
import ProfileSearchAndAccount from "../components/profile/commonParts/ProfileSearchAndAccount.jsx";
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/index.js";
import {getAllHistory} from "../http/docsApi.js";
import {INDEPENDENT_USER, OFFICE_MANAGER} from "../data/userRolesData.js";
import {getAllEmployees} from "../http/employeeApi.js";
import {getAllEmails} from "../http/userApi.js";
import Loader from "../components/Loader.jsx";

const Profile = observer(() => {
  const {user, documents, fetchChanges, searchData} = useContext(AuthContext)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log('history')
    getAllHistory()
      .then(data => documents.setHistory(data))
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false))
  }, [fetchChanges.isHistoryChanged]);

  useEffect(() => {
    switch (user.role) {
      case OFFICE_MANAGER:
        console.log("office_manager_employees")
        getAllEmployees()
          .then(data => user.setEmployees(data))
          .catch((e) => console.error(e))
          .finally(() => setIsLoading(false))
        break
      case INDEPENDENT_USER:
        console.log("ind_user_emails")
        getAllEmails()
          .then(data => searchData.setEmails(data))
          .catch((e) => console.error(e))
          .finally(() => setIsLoading(false))
        break
    }
  }, [fetchChanges.isOtherChanged]);

  if (isLoading) {
    return <Loader/>
  }

  return (
    <section className={"container-fluid min-vh-100 px-0 bg-light"}>
      <div className={"d-flex flex-row"}>
        <div className={"bg-white"}>
          <ProfileSideMenu/>
        </div>
        <div className={"container w-100"}>
          <ProfileSearchAndAccount/>
          <Outlet/>
        </div>
      </div>
    </section>
  )
})

export default Profile