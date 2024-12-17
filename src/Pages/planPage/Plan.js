import React, { useEffect, useState } from 'react'
import './Plan.css'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Plan = ({ settings }) => {

    const [plan, setPlan] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState("");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/subscriptions`)
            .then(res => {
                if (res.data.status) {
                    setPlan(res.data.data);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }, []);
    const navigate = useNavigate();

    const handleselectedplan = (title) => {
        setSelectedPlan(title);
    }

    const handlepaynow = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        } else {
            navigate("/login")
        }
    }
    return (
        <div className='Plan_Subscription'>
            <Navbar settings={settings} />
            <br />
            <br />
            <div className='heading'>
                <p>SETP 2 OF 2</p>
                <h2>Choose the plan that’s right for you</h2>
            </div>
            <form>
                <div className='Plans_details'>
                    {plan &&
                        plan.map((item, index) => (
                            <div key={index} onClick={() => handleselectedplan(item.title)}
                                className={`plan-card
                                ${selectedPlan === item.title ? "selected" : ""} 
                                ${item.title === "Basic" ? "most-popular"
                                        : item.title === "Premium" ? "Premium"
                                            : item.title === "Standard" ? "popular"
                                                : item.title === "Mobile" ? "mobile"
                                                    : ""
                                    }`}>
                                <div className={`plan-header ${item.title === "Basic" ? "most-popular"
                                    : item.title === "Premium" ? "Premium"
                                        : item.title === "Standard" ? "popular"
                                            : item.title === "Mobile" ? "mobile"
                                                : ""
                                    } ${selectedPlan === item.title ? "selected-header" : ""}`}>

                                    <h3>{item.title}</h3>
                                    <p>{item.resolution}</p>
                                    {selectedPlan === item.title && <span>✔ </span>}
                                </div>
                                <div className='plan-details'>
                                    <p>Price : <strong>{item.price}</strong></p>
                                    <p>Resolution: <strong>{item.resolution}</strong></p>
                                    <p>Sound Quality: <strong>{item.sound_quality}</strong></p>
                                    <p>Devices:<strong>{item.supported_devices}</strong></p>
                                    <p>Connection : <strong>{item.connection}</strong></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <button onClick={handlepaynow} disabled={!selectedPlan} type='button' className='paynowbtn'>Pay Now</button>
            </form>
            <Footer settings={settings} />
        </div>

    )
}

export default Plan
