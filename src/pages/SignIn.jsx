import {useContext, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {AuthContext} from '../context'
import {login} from '../http/userApi'
import {observer} from "mobx-react-lite";

const SignIn = observer(() => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async (e) => {
        e.preventDefault()
        try {
            const data = await login(email, password)
            user.setIsAuth(true)
            user.setUser(data)
            navigate('/profile')
        } catch (e) {
            if (e.response.status === 403) {
                alert("Wrong credentials!")
            }
        }
    }

    return (
        <section className="d-flex min-vh-100">
            <div className="container-fluid">
                <div className="row h-100">
                    <div className="col-lg-6 col-12 my-auto">
                        <div className="w-75 mx-auto">
                            <div className="text-primary mb-5 fs-1 fw-bolder">
                                Hi, Welcome Back!
                            </div>
                            <form onSubmit={signIn}>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputEmail" className="form-label opacity-75">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control p-3 rounded-4"
                                        id="exampleInputEmail"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="exampleInputPassword" className="form-label w-100">
                                        <div className="d-flex flex-row justify-content-between opacity-75">
                                            Password
                                            <Link to='/recover'>
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control p-3 rounded-4"
                                        id="exampleInputPassword"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 p-3 rounded-4"
                                >
                                    Sign In
                                </button>
                                <div className={"text-center mt-4"}>
                                    <span className={"opacity-75"}>
                                        You don&apos;t Have an Account?
                                    </span>
                                    {' '}
                                    <span>
                                    <Link to='/register'>
                                      Sign Up
                                    </Link>
                                  </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-6 d-lg-flex d-none bg-primary">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="text-center text-white w-75">
                                <h1>Getting Easier to manage your documents online</h1>
                                <p className="small opacity-75 mt-5">
                                    Sign In and discover the world of digital documents
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
})

export default SignIn