import React, { useState } from 'react'
import './Login.css'
//import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Alert } from 'react-bootstrap'
import { RiCloseFill } from "react-icons/ri";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";


const Login = ({ settings }) => {

  const [sign, setSign] = useState("Sign In");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: '',
    rememberme: false,
    confirmpassword: false,
    fullname: ''

  })

  /*
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
  */

  const handlechange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values, [name]: value
    })
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let validation = {}

    if (values.email === "") {
      validation.email = "Enter the Email"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      validation.email = "Email is not valid"
    }

    if (values.password === "") {
      validation.password = "Enter the Password"
    } else if (values.password.length < 6) {
      validation.password = "Password is should be at least 6 char"
    }

    if (sign === "Sign Up" && values.fullname === "") {
      validation.fullname = "Enter your Name"
    }

    setError(validation);

    if (Object.keys(validation).length === 0) {

      const apiUrl = sign === "Sign In"
        ? `${process.env.REACT_APP_BASE_URL}/login`
        : `${process.env.REACT_APP_BASE_URL}/register`;

      const requestData = sign === "Sign In"
        ? { email: values.email, password: values.password }
        : { fullname: values.fullname, email: values.email, password: values.password, confirmpassword: values.password }

      axios.post(apiUrl, requestData)
        .then(res => {
          if (res.data.status) {
            const { data } = res.data;
            localStorage.setItem("token", res.data.token);
            if (data) {
              localStorage.setItem("user", JSON.stringify(res.data.data))
            } else {
              console.log("userdata not found")
            }
            //localStorage.setItem("user", JSON.stringify(res.data.user))
            console.log(res);
            if (sign === "Sign In") {
              navigate("/");
            } else {
              setAlert({
                message: res.data.message,
                variant: "success"
              })
            }
          } else {
            setAlert({
              message: res.data.message[0].msg,
              variant: "danger"
            })
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    setLoading(false);
  }
  const handleclose = () => {
    setAlert(null);
  }
  const handleshow = () => {
    setShow(!show);
  }
  const netflixhome = () => {
    navigate("/");
  }

  return (
    loading ? <div className='login-sinner'>
      <img src={netflix_spinner} alt='' />
    </div> :
      <div className='login'>
        {
          settings && settings.data &&
          (
            <img src={settings.data.logo} alt='' className='login-logo' onClick={netflixhome} />
          )
        }
        <div className='login-form'>
          <h1>{sign}</h1>
          {alert && (
            <Alert variant={alert.variant} className={`${alert.variant}`}>
              {alert.message}
              <RiCloseFill className='close-icon3' onClick={handleclose} />
            </Alert>
          )}
          <form onSubmit={handlesubmit}>
            {sign === "Sign Up" ?
              <div>
                <input type='text' placeholder='Your name' name='fullname' value={values.fullname} onChange={handlechange} />
                {error.fullname &&
                  <p className="error"><small>{error.fullname}</small></p>
                }
              </div>
              : <></>
            }
            <div>
              <input type='text' placeholder='Email' name="email" value={values.email} onChange={handlechange} />
              {error.email &&
                <p className="error"><small>{error.email}</small></p>
              }
            </div>
            <div>
              <input type={show ? 'text' : 'password'} placeholder='Password' name="password" value={values.password} onChange={handlechange} />
              <span className='password-toggle-icon' onClick={handleshow}>{show ? <FaRegEyeSlash /> : <FaRegEye />}</span>
              {error.password &&
                <p className="error"><small>{error.password}</small></p>
              }
            </div>
            <button type='submit'>{sign}</button>
            <div className='form-help'>
              <div className='remember'>
                <input type='checkbox' />
                <label htmlFor=''>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
            <Link to="/forgot" className='forgotpassword'>
              Forgot password?
            </Link>
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
