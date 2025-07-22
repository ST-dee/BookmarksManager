import { useState } from "react"
import { useAuth } from "../components/AuthContext"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function Login() {

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const [isValidLogin, setIsValidLogin] = useState(true)
  const [formUser, setFormUser] = useState({email: '', password: ''})

  const onSubmitClick = async e => {
    e.preventDefault()

    const { data } = await axios.post('/api/account/login', formUser)
    //try without if
    if (data) {
      setIsValidLogin(true)
      setUser(data)
      navigate('/')
      }
      setIsValidLogin(false)
      setFormUser({ email: '', password: '' })
  }

  function onInputChange(e) {
    setFormUser({ ...formUser, [e.target.name]: e.target.value })
  }

  return <div className="container" style={{ marginTop: '80px' }}>
    <main role="main" className="pb-3">
      <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
          <h3>Log in to your account</h3>
          {isValidLogin || <div className='text-danger'>Invalid login. Please try again.</div>}
          <form onSubmit={onSubmitClick}>
            <input type="text" name="email" onChange={e => { onInputChange(e) }} placeholder="Email" className="form-control" value={formUser.email} /><br />
            <input type="password" name="password" onChange={e => { onInputChange(e) }} placeholder="Password" className="form-control" value={formUser.password} /><br />
            <button className="btn btn-primary" >Login</button>
          </form>
          <a href="/signup">Sign up for a new account</a>
        </div>
      </div>
    </main>
  </div>
}