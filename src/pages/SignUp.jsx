import {useContext, useState} from "react"
import {registration} from "../http/userApi"
import {useNavigate} from 'react-router-dom'
import {AuthContext} from "../context/index.js";
import {observer} from "mobx-react-lite";

const SignUp = observer(() => {

    const {user} = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const navigate = useNavigate()

    const signUp = async (e) => {
        e.preventDefault()
        if (email !== '' &&
            firstName !== '' &&
            lastName !== '' &&
            phoneNumber !== '' &&
            password !== '' &&
            country !== '' &&
            city !== ''
        ) {
            try {
                const data = await registration(
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    password,
                    country,
                    city
                )
                user.setIsAuth(true)
                user.setUser(data)
                navigate('/profile')
            } catch (e) {
                alert(e)
            }
        } else {
            alert('Empty field')
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
                                                value={firstName}
                                                onChange={e => setFirstName(e.target.value)}
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
                                                value={lastName}
                                                onChange={e => setLastName(e.target.value)}
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
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
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
                                        value={phoneNumber}
                                        onChange={e => setPhoneNumber(e.target.value)}
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
                                            value={country}
                                            onChange={e => setCountry(e.target.value)}
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
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
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
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
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