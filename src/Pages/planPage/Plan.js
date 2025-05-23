import React, { useEffect, useState } from 'react'
import './Plan.css'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { createRazorPayOrder } from './Payment';

const Plan = ({ settings }) => {

    const [plan, setPlan] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null);

    useEffect(() => {
        fatchSubscription();
        document.title = "Netflix - Subscription Plan";
    }, []);

    //subscription API
    const fatchSubscription = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/subscriptions`)
            if (res.data.status) {
                setPlan(res.data.data);
            }
        }
        catch (err) {
            console.log(err, "Error from fatchSubscription API");
        }
    }

    const navigate = useNavigate();

    const handleselectedplan = (title) => {
        setSelectedPlan(title);
    }

    //Paynow to paymentredirect 
    const handlepaynow = () => {
        const token = localStorage.getItem("token");
        if (token && selectedPlan) {
            createRazorPayOrder(selectedPlan.id, selectedPlan.price);
        } else {
            navigate("/login")
        }
        if (selectedPlan) {
            console.log("plan id", selectedPlan.id)
        }
        console.log("Selected Plan Object:", selectedPlan);
    }

    return (
        <div className='Plan_Subscription'>
            <Navbar settings={settings} />
            <br />
            <br />
            <div className='heading'>
                <p>SETP 2 OF 2</p>
                <h2>Choose the monthly plan that’s right for you</h2>
            </div>
            <form>
                <div className='Plans_details'>
                    {plan &&
                        plan.map((item, index) => (
                            <div key={index} onClick={() => handleselectedplan(item)}
                                className={`plan-card
                                ${selectedPlan?.title === item.title ? "selected" : ""} 
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
                                    } ${selectedPlan?.title === item.title ? "selected-header" : ""}`}>

                                    <h3>{item.title}</h3>
                                    <p>{item.resolution}</p>
                                    {selectedPlan?.title === item.title && <span>✔ </span>}
                                </div>
                                <div className='plan-details'>
                                    <p>Price:<strong className='highlight'>₹{item.price}</strong></p>
                                    <p>Resolution:<strong>{item.resolution}</strong></p>
                                    <p>Sound Quality:<strong>{item.sound_quality}</strong></p>
                                    <p>Devices:<strong>{item.supported_devices}</strong></p>
                                    <p>Number of User:<strong>{item.connection}</strong></p>
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
