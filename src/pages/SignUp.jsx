import {useContext, useState} from "react"
import {registration} from "../http/userApi"
import {useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/index.js";
import {observer} from "mobx-react-lite";

const SignUp = observer(() => {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [userForm, setUserForm] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
        country: '',
        city: ''
    })

    const signUp = async (e) => {
        e.preventDefault()

        if (Object.values(userForm).every(uf => uf !== '')) {
            try {
                if (userForm.password.length >= 6) {
                    const data = await registration(
                        userForm.email,
                        userForm.firstName,
                        userForm.lastName,
                        userForm.phoneNumber,
                        userForm.password,
                        userForm.country,
                        userForm.city
                    )
                    console.log(data)
                    user.setIsAuth(true)
                    user.setUser(data)
                    navigate('/profile')
                } else {
                    alert('Password should contain at least 6 characters')
                }
            } catch (e) {
                console.log(e)
                // if (e.response.status && e.response.status === 409) {
                //     alert("User already exists by email: " + userForm.email)
                // } else {
                //     console.log(e)
                // }
            }
        } else {
            alert('Empty fields')
        }
    }

    return (
        <section className="d-flex vh-100">
            <div className="container-fluid">
                <div className="row h-100">
                    <div className="col-md-6 my-auto">
                        <div className="w-75 mx-auto">
                            <div className="text-primary mb-4">
                                <h1 className="fw-bolder">
                                    Get started
                                </h1>
                            </div>
                            <form>
                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="exampleInputFirstName1"
                                                className="form-label opacity-75"
                                            >
                                                First Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control p-3 rounded-4"
                                                id="exampleInputFirstName1"
                                                placeholder="First Name"
                                                value={userForm.firstName}
                                                onChange={e => setUserForm({...userForm, firstName: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="exampleInputLastName1"
                                                className="form-label opacity-75"
                                            >
                                                Last Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control p-3 rounded-4"
                                                id="exampleInputLastName1"
                                                placeholder="Last Name"
                                                value={userForm.lastName}
                                                onChange={e => setUserForm({...userForm, lastName: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleInputEmail1"
                                        className="form-label opacity-75"
                                    >
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control p-3 rounded-4"
                                        id="exampleInputEmail1"
                                        placeholder="Email Address"
                                        value={userForm.email}
                                        onChange={e => setUserForm({...userForm, email: e.target.value})}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label
                                        htmlFor="exampleInputPhone1"
                                        className="form-label opacity-75"
                                    >
                                        Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control p-3 rounded-4"
                                        id="exampleInputPhone1"
                                        placeholder="Phone Number"
                                        value={userForm.phoneNumber}
                                        onChange={e => setUserForm({...userForm, phoneNumber: e.target.value})}
                                    />
                                </div>
                                <div className="row mb-2">
                                    <div className="col-md-6">
                                        <label
                                            htmlFor="exampleInputCountry1"
                                            className="form-label opacity-75"
                                        >
                                            Country
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control p-3 rounded-4"
                                            id="exampleInputCountry1"
                                            placeholder="Country"
                                            value={userForm.country}
                                            onChange={e => setUserForm({...userForm, country: e.target.value})}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label
                                            htmlFor="exampleInputCity1"
                                            className="form-label opacity-75"
                                        >
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control p-3 rounded-4"
                                            id="exampleInputCity1"
                                            placeholder="City"
                                            value={userForm.city}
                                            onChange={e => setUserForm({...userForm, city: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label
                                        htmlFor="exampleInputPassword1"
                                        className="form-label opacity-75"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control p-3 rounded-4"
                                        id="exampleInputPassword1"
                                        placeholder="Password"
                                        value={userForm.password}
                                        onChange={e => setUserForm({...userForm, password: e.target.value})}
                                    />
                                </div>

                                <button
                                    onClick={signUp}
                                    className="btn btn-primary w-100 p-3 rounded-4"
                                >
                                    Sign Up
                                </button>
                            </form>
                        </div>
                    </div>
                    <div
                        className="col-md-6"
                        style={{backgroundColor: '#407BFF'}}
                    >
                        <div className="d-flex align-items-center justify-content-center h-100 my-auto">
                            <div className="text-start text-white w-50">
                                <h1>Getting Easier to manage your documents onlines</h1>
                                <p className="small opacity-75 mt-5">
                                    Sign up and discover the world of digital documents
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default SignUp