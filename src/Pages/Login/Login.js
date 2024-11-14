import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'


const Login = () => {

  const [sign, setSign] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (sign === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    loading ? <div className='login-sinner'>
      <img src={netflix_spinner} alt='' />
    </div> :
      <div className='login'>
        <img src={logo} alt='' className='login-logo' />
        <div className='login-form'>
          <h1>{sign}</h1>
          <form>
            {sign === "Sign Up" ? <input value={name} onChange={(e) => { setName(e.target.value) }} type='text' placeholder='Your name' /> : <></>}
            <input value={email} onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Email' autoComplete='username'/>
            <input value={password} onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Password' autoComplete='current-password' />
            <button onClick={user_auth} type='submit'>{sign}</button>
            <div className='form-help'>
              <div className='remember'>
                <input type='checkbox' />
                <label htmlFor=''>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>
          <div className='form-switch'>
            {sign === "Sign In" ?
              <p>New to Netfilx? <span onClick={() => { setSign("Sign Up") }}>Sign Up Now</span></p>
              :
              <p>Already have account? <span onClick={() => { setSign("Sign In") }}>Sign In Now</span></p>
            }
          </div>
        </div>
      </div>
  )
}

export default Login
