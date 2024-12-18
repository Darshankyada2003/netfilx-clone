import React, { useEffect, useState } from "react";
import './Profile.css'
import 'reactjs-popup'
import Popup from "reactjs-popup";
import profile_img from '../../assets/profile_img.png'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from 'react-bootstrap'
import { RiCloseFill } from "react-icons/ri";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";



const Profile = ({ settings }) => {

    const [user, setUser] = useState(null);
    const [file, setFile] = useState(null);
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState({});
    const [imageUrl, setImageUrl] = useState(profile_img);
    const [eye, setEye] = useState(false);
    const [eyeConfirm, SetEyeConfirm] = useState(false);

    const [changePassword, setChangepassword] = useState({
        password: '',
        confirmPassword: '',
        token: ''
    })
    const [updateprofile, setUpdateprofile] = useState({
        fullName: '',
        email: '',
        token: '',
        image: ''
    })

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem("user"));
        if (userdata) {
            setUser(userdata);
            setUpdateprofile({
                fullName: userdata.fullName,
                email: userdata.email,
                image: userdata.image
            })
            setImageUrl(userdata.image || profile_img);
        };

    }, []);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (!token) {
        console.log("please log in");
        return;
    }

    const handleedit = (e) => {
        const { name, value } = e.target;
        setUpdateprofile({
            ...updateprofile, [name]: value
        })
    }
    const handleeye = () => {
        setEye(!eye);
    }
    const handleeyeConfirm = () => {
        SetEyeConfirm(!eyeConfirm);
    }

    const editprofile = (e) => {
        e.preventDefault();

        const validation = {}

        if (updateprofile.fullName === "") {
            validation.fullName = "Enter the fullName"
        }
        if (updateprofile.email === "") {
            validation.email = "Enter the email"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updateprofile.email)) {
            validation.email = "Email is not valid"
        }
        setError(validation);

        if (Object.keys(validation).length === 0) {
            const formdata = new FormData();

            if (file) {
                formdata.append('image', file);
            }
            formdata.append('fullName', updateprofile.fullName);
            formdata.append('email', updateprofile.email);

            axios.post(`${process.env.REACT_APP_BASE_URL}/editProfile`, formdata,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    if (res.data.status) {

                        const updateuser = {
                            email: res.data.user.email,
                            fullName: res.data.user.fullName,
                            image: res.data.user.image || profile_img
                        };
                        console.log(updateprofile);
                        setImageUrl(res.data.user.image);
                        localStorage.setItem("user", JSON.stringify(updateuser));

                        setAlert({
                            message: res.data.message,
                            variant: "success"
                        })
                    } else {
                        console.error("profile failed")
                        setAlert({
                            message: res.data.message,
                            variant: "danger"
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const fileUpload = (e) => {
        const upload = e.target.files[0];
        if (upload) {
            debugger
            setFile(upload);

            let value = URL.createObjectURL(upload);
            setImageUrl(value);

        } else {
            setFile(null);
            setImageUrl(profile_img);
            console.log("imageUrl:", imageUrl);
        }
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

            axios.post(`${process.env.REACT_APP_BASE_URL}/changePassword`, changePassword,
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

    const handleclose = () => {
        setAlert(null);
    }
    const netflixhome = () => {
        navigate("/");
    }
    const handlesignout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    }
    return (
        <div className="profile-page">
            {settings && settings.data &&
                (
                    <img src={settings.data.logo} alt="" className="profile-logo" onClick={netflixhome} />
                )
            }
            <div className="profile-form">
                <h1>Profile</h1>
                <form onSubmit={editprofile}>
                    {alert && (
                        <Alert variant={alert.variant} className="profile-alert">
                            {alert.message}
                            <RiCloseFill className='close-icon-profile' onClick={handleclose} />
                        </Alert>
                    )}
                    <ul>
                        <li>
                            <label>Profile :</label>
                            <div>
                                <img src={imageUrl} alt="Profile" className="profile-img" />                                <br />
                                <input type="file" onChange={fileUpload} name="image" />
                            </div>
                        </li>
                        {user && (
                            <div>
                                <li>
                                    <label>Full Name : </label>
                                    <input type="text" placeholder="Enter your Name" className="profile-input" name="fullName" value={updateprofile.fullName} onChange={handleedit} />
                                    {error.fullName && <p className="error"><small>{error.fullName}</small></p>}

                                </li>
                                <li>
                                    <label>Email : </label>
                                    <input type="text" placeholder="Enter your Email" className="profile-input" name="email" value={updateprofile.email} onChange={handleedit} />
                                    {error.email && <p className="error"><small>{error.email}</small></p>}
                                </li>
                                <button className="updateprofile" type="submit">Update Profile</button>
                            </div>
                        )}
                    </ul>
                    <Popup trigger=
                        {<Link className="changepassowrd">Change Password ?</Link>}
                        modal nested>
                        {
                            (close) => (

                                <div className='resetpassword-form'>
                                    <div className="area">
                                        <RiCloseFill className='close-icon' onClick={() => { setAlert(null); close() }} />
                                    </div>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                    }}>

                                        <h1>Change Password</h1>
                                        {alert && (
                                            <Alert variant={alert.variant} className={`${alert.variant}`}>
                                                {alert.message}
                                                <RiCloseFill className='close-icon1' onClick={handleclose} />
                                            </Alert>
                                        )}

                                        <input type={eye ? "text" : "password"} placeholder='Password' name="password" onChange={handlechange} value={changePassword.password} />
                                        <span className="eyeicon1" onClick={handleeye}>{eye ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                                        {error.password &&
                                            <p className="error"><small>{error.password}</small></p>
                                        }
                                        <input type={eyeConfirm ? "text" : "password"} placeholder='Confirm Password' name="confirmPassword" onChange={handlechange} value={changePassword.confirmPassword} />
                                        <span className="eyeicon2" onClick={handleeyeConfirm}>{eyeConfirm ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                                        {error.confirmPassword &&
                                            <p className="error2"><small>{error.confirmPassword}</small></p>
                                        }
                                        <button type="submit" onClick={handlesubmit}>Change Password</button>
                                        <button type="button" onClick={() => { setAlert(null); close() }}>Close</button>
                                    </form>
                                </div>
                            )
                        }
                    </Popup>
                </form>
                <Link to="/login" className="changepassowrd" onClick={handlesignout}>SignOut ?</Link>

            </div>
        </div >
    )
}
export default Profile