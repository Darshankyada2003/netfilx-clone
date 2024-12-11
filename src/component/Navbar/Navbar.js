import React, { useEffect, useRef, useState } from 'react'
import './Navbar.css'
import search from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_icon from '../../assets/caret_icon.svg'
import { useNavigate } from 'react-router-dom'

// import { logout } from '../../firebase';

const Navbar = ({ settings }) => {

    const navRef = useRef();
    const navigate = useNavigate();
    const [userlogin, setUserlogin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setUserlogin(!!token);

        const handleScroll = () => {
            if (navRef.current) {
                if (window.scrollY >= 80) {
                    navRef.current.classList.add("nav-dark");
                } else {
                    navRef.current.classList.remove("nav-dark");
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    const handlelogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setUserlogin(true);
    }
    const handlelogin = () => {
        navigate("/login");
    }
    const profilepage = () => {
        navigate("/profile");
    }
    const subscribe = () => {
        navigate("/subscription")
    }
    const home = () => {
        navigate("/")
    }
    return (    
        <div className='navbar' ref={navRef}>
            <div className='navbar-left'>
                {settings && settings.data && (<img src={settings.data.logo} alt='' />)}
                <ul>
                    <li onClick={home}>Home</li>
                    <li>TV Show</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li onClick={subscribe}>Subscribe to Watch</li>
                </ul>
            </div>
            <div className='navbar-right' >
                <img src={search} alt='' className='icons' />
                <p>Children</p>
                <img src={bell_icon} alt='' className='icons' />
                {userlogin ?
                    (
                        <div className='navbar-profile'>
                            <img src={profile_img} alt='' className='profile' onClick={profilepage} />
                            <img src={caret_icon} alt='' />
                            <div className='dropdown'>
                                <p onClick={handlelogout}>Sign Out of Netfilx</p>
                            </div>
                        </div>
                    ) :
                    (
                        <button className='button' onClick={handlelogin}>Sign In</button>
                    )
                }

            </div>
        </div>
    )
}

export default Navbar
