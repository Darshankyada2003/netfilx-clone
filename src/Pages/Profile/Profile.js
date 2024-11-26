import React, { useEffect, useState } from "react";
import './Profile.css'
import 'reactjs-popup'
import Popup from "reactjs-popup";
import profile_img from '../../assets/profile_img.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { Alert } from 'react-bootstrap'
import { RiCloseFill } from "react-icons/ri";



const Profile = ({ settings }) => {

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState({});
    const [changePassword, setChangepassword] = useState({
        password: '',
        confirmPassword: '',
        token: ''
    })

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        if (userdata) {
            setUser(userdata);
            setEmail(userdata.email);
            setName(userdata.fullName);
        }
    }, [])


    const token = localStorage.getItem("token");
    if (!token) {
        console.log("please log in");
        return;
    }

    const payload = {
        password: changePassword.password,
        confirmPassword: changePassword.confirmPassword,
    }

    const handlesubmit = (e) => {
        e.preventDefault();

        const validation = {}

        if (changePassword.password === "") {
            validation.password = "Enter the password"
        } else if (changePassword.password.length < 6) {
            validation.password = "Password should be at least 6 char"
        }

        if (changePassword.confirmPassword === "") {
            validation.confirmPassword = "Enter the confirmpassword"
        } else if (changePassword.confirmPassword !== changePassword.password) {
            validation.confirmPassword = "Password do not match "
        }

        setError(validation);
        if (Object.keys(validation).length === 0) {

            axios.post(`${process.env.REACT_APP_BASE_URL}/changePassword`, payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
                .then(res => {
                    if (res.data.status) {
                        setChangepassword({
                            password: '',
                            confirmPassword: ''
                        });
                        setAlert({
                            message: res.data.message,
                            variant: "success"
                        })
                    } else {
                        setAlert({
                            message: res.data.message,
                            variant: "danger"
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        };
    }
    const handlechange = (e) => {
        const { name, value } = e.target;
        setChangepassword({
            ...changePassword, [name]: value
        })
    }
    const fileUpload = (e) => {
        const upload = e.target.files[0];
        if (upload) {
            setFile(URL.createObjectURL(upload))
        }
    }
    const changename = (e) => {
        setName(e.target.value);
    }
    const changeemail = (e) => {
        setEmail(e.target.value);
    }
    const handleclose = () => {
        setAlert(null);
    }

    return (
        <div className="profile-page">
            {settings && settings.data && settings.data[0].logo &&
                (
                    <img src={settings.data[0].logo} alt="" className="profile-logo" />
                )
            }
            <div className="profile-form">
                <h1>Profile</h1>
                <form>
                    <ul>
                        <li>
                            <label>Profile :</label>
                            <div>
                                {
                                    file ?
                                        (
                                            <img src={file} alt="upload" className="profile-img" />
                                        ) :
                                        (
                                            <img src={profile_img}
                                                alt="default-img"
                                                className="profile-img"
                                            />
                                        )
                                }
                                <br />
                                <input type="file" onChange={fileUpload} />
                            </div>
                        </li>
                        {user && (
                            <div>
                                <li>
                                    <label>FullName : </label>
                                    <input type="text" placeholder="Enter your Name" className="profile-input" value={name} onChange={changename} />
                                </li>
                                <li>
                                    <label>Email : </label>
                                    <input type="text" placeholder="Enter your Name" className="profile-input" value={email} onChange={changeemail} />
                                </li>
                                <button className="updateprofile" type="button">Update Profile</button>
                            </div>
                        )}
                    </ul>
                    <Popup trigger=
                        {<Link className="changepassowrd ">Change Password ?</Link>}
                        modal nested>
                        {
                            close => (

                                <div className='resetpassword-form'>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                    }}>

                                        <h1>Reset password</h1>
                                        {alert && (
                                            <Alert variant={alert.variant} className={`${alert.variant}`}>
                                                {alert.message}
                                                <RiCloseFill className='close-icon' onClick={handleclose} />
                                            </Alert>
                                        )}

                                        <input type='password' placeholder='Password' name="password" onChange={handlechange} value={changePassword.password} />
                                        {error.password &&
                                            <p className="error"><small>{error.password}</small></p>
                                        }
                                        <input type='password' placeholder='Confirm Password' name="confirmPassword" onChange={handlechange} value={changePassword.confirmPassword} />
                                        {error.confirmPassword &&
                                            <p className="error2"><small>{error.confirmPassword}</small></p>
                                        }
                                        <button type="submit" onClick={handlesubmit}>Reset Password</button>
                                        <button type="button" onClick={() => { setAlert(null); close() }}>cancel</button>
                                    </form>
                                </div>
                            )
                        }
                    </Popup>
                </form>
            </div>
        </div >
    )
}
export default Profile