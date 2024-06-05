import {Outlet} from "react-router-dom"
import ProfileSideMenu from "../components/profile/ProfileSideMenu.jsx";
import ProfileSearchAndAccount from "../components/profile/ProfileSearchAndAccount.jsx";

const Profile = () => {
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
}

export default Profile