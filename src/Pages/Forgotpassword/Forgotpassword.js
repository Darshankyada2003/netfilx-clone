import React, { useState } from "react";
import logo from '../../assets/logo.png'
import './Forgotpassword.css'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { RiCloseFill } from "react-icons/ri";


const Forgot = () => {

    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [alert, setAlert] = useState(null);
    const [email, setEmail] = useState({
        email: ''
    })

    const handlechange = (e) => {
        const { name, value } = e.target;
        setEmail({
            ...email, [name]: value
        })
    }
    const handleclose = () => {
        setAlert(null);
    }
    const netflixhome = () => {
        navigate("/");
    }
    const handlesubmit = async (e) => {
        e.preventDefault();

        let validation = {}

        if (email.email === "") {
            validation.email = "Enter the Email"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.email)) {
            validation.email = "Email is not valid"
        }
        setError(validation);

        if (Object.keys(validation).length === 0) {
            axios.post(`${process.env.REACT_APP_BASE_URL}/forgot_password`, email)
                .then(res => {
                    if (res.data.status) {
                        console.log(res);
                    } else {
                        setAlert({
                            message: res.data.msg,
                            variant: "danger"
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    return (
        <div className="forgot">
            <img src={logo} alt='' className='login-logo' onClick={netflixhome} />
            <div className='forgot-form'>
                <h1>Forgot password</h1>
                {alert && (
                    <Alert variant={alert.variant} className={`${alert.variant}`}>
                        {alert.message}
                        <RiCloseFill className='close-icon' onClick={handleclose} />
                    </Alert>
                )}
                <form onSubmit={handlesubmit}>
                    <div>
                        <input type='text' placeholder='Email' autoComplete='username' name="email" value={email.email} onChange={handlechange} />
                        {error.email &&
                            <p className="error"><small>{error.email}</small></p>
                        }
                    </div>
                    <button type='submit'>Request new password</button>
                    &nbsp;
                    <Link to="/login" className='login-forgot'>
                        Sign In ?
                    </Link>
                </form>
            </div>
        </div>

    )
}
export default Forgot