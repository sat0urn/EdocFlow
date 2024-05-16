import {useState} from "react";
import {updatePassword} from "../../http/userApi.js";

const ProfileSecurity = () => {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const update = async (e) => {
        e.preventDefault()
        try {
            const {data} = await updatePassword(
                oldPassword,
                newPassword
            )
            alert(data)
        } catch (e) {
            if (e.response.status === 403) {
                alert(e.response.data)
            }
        }
    }

    return (
        <>
            <div className={"container w-75"}>
                <div className={"py-5 border-bottom border-2"}>
                    <div className={"mb-4"}>
                        <h5 className={"fw-bold"}>Login</h5>
                    </div>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <div className={""}>
                            <h6 className={"fw-bold"}>Password</h6>
                            <p className={"text-secondary m-0"}>Last updated 1 month ago</p>
                        </div>
                        <button
                            type={"button"}
                            className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            Update password
                        </button>
                    </div>
                </div>
                <div className={"py-5 border-bottom border-2"}>
                    <div className={"mb-4"}>
                        <h5 className={"fw-bold"}>Social accounts</h5>
                    </div>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <div className={""}>
                            <h6 className={"fw-bold"}>Facebook</h6>
                            <p className={"text-secondary m-0"}>Not connected</p>
                        </div>
                        <button className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}>
                            Connect
                        </button>
                        <div className={""}>
                            <h6 className={"fw-bold"}>Apple account</h6>
                            <p className={"text-secondary m-0"}>Not connected</p>
                        </div>
                        <button className={"btn btn-outline-secondary rounded-pill fw-bolder px-4"}>
                            Connect
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Update password
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <form onSubmit={update}>
                            <div className="modal-body">
                                <div className="my-4 mx-auto w-75">
                                    <label
                                        htmlFor="exampleInputOldPassword"
                                        className="form-label opacity-75"
                                    >
                                        Old password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control p-3"
                                        id="exampleInputOldPassword"
                                        placeholder="Old password"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4 mx-auto w-75">
                                    <label
                                        htmlFor="exampleInputNewPassword"
                                        className="form-label opacity-75"
                                    >
                                        New password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control p-3"
                                        id="exampleInputNewPassword"
                                        placeholder="New password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 p-2"
                                    onClick={update}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileSecurity