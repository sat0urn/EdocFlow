import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context'
import { login } from '../http/userApi'

function SignIn() {
  const navigate = useNavigate()
  const { setIsAuth } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signIn = async (e) => {
    e.preventDefault()
    const response = await login(email, password)
    if (response.data.status) {
      setIsAuth(true)
      localStorage.setItem('auth', 'true')
      navigate('/profile')
    } else {
      alert(response.data.message)
    }
  }

  return (
    <section className="d-flex vh-100">
      <div className="container-fluid">
        <div className="row h-100">
          <div className="col-md-6 my-auto">
            <div className="w-75 mx-auto">
              <div className="text-primary mb-5">
                <h1 className="fw-bolder">Hi, Welcome Back!</h1>
              </div>
              <form onSubmit={signIn}>
                <div className="mb-4">
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label opacity-75"
                  >
                    Email or username
                  </label>
                  <input
                    type="email"
                    className="form-control p-3 rounded-4"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Email or username"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleInputPassword1"
                    className="form-label w-100"
                  >
                    <div className="row">
                      <div className="col-md-6 opacity-75">
                        Password
                      </div>
                      <div className="col-md-6">
                        <div className="text-end">
                          <Link to='/recover'>
                            Forgot Password?
                          </Link>
                        </div>
                      </div>
                    </div>
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
                  type="submit"
                  className="btn btn-primary w-100 p-3 rounded-4"
                >
                  Sign In
                </button>
                <p className='text-center mt-4'>
                  <span className='opacity-75'>
                    You don&apos;t Have an Account?
                  </span>&nbsp;
                  <span>
                    <Link to='/register'>
                      Sign Up
                    </Link>
                  </span>
                </p>
              </form>
            </div>
          </div>
          <div
            className="col-md-6"
            style={{ backgroundColor: '#407BFF' }}>
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
}

export default SignIn