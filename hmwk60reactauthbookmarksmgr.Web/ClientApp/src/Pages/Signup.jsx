import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function SignUp(){

const [formUser, setFormUser] = useState({firstName: '', lastName: '', email: '', password: ''})
const navigate = useNavigate()

const onSubmitClick = async e => {
  e.preventDefault()
  await axios.post('/api/account/signup', formUser)
  navigate('/')
}

    return <div className="container" style={{ marginTop: '80px' }}>
  <main role="main" className="pb-3">
    <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
        <h3>Sign up for a new account</h3>
        <form onSubmit={onSubmitClick}>
          <input type="text" name="firstName" placeholder="First Name" className="form-control" value={formUser.firstName} onChange={e => {setFormUser({...formUser, [e.target.name]: e.target.value})}}/><br />
          <input type="text" name="lastName" placeholder="Last Name" className="form-control" value={formUser.lastName} onChange={e => {setFormUser({...formUser, [e.target.name]: e.target.value})}} /><br />
          <input type="text" name="email" placeholder="Email" className="form-control" value={formUser.email} onChange={e => {setFormUser({...formUser, [e.target.name]: e.target.value})}}/><br />
          <input type="password" name="password" placeholder="Password" className="form-control" value={formUser.password} onChange={e => {setFormUser({...formUser, [e.target.name]: e.target.value})}}/><br />
          <button className="btn btn-primary">Signup</button>
        </form>
      </div>
    </div>
  </main>
</div>
}