import React, { useEffect, useState } from 'react'
import './Plan.css'
import { Link } from 'react-router-dom'
import Navbar from '../../component/Navbar/Navbar'
import Footer from '../../component/Footer/Footer'
import axios from 'axios'

const Plan = ({ settings }) => {

    const [plan, setPlan] = useState([]);

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

    return (
        <div className='Plan_Subscription'>
            <Navbar settings={settings} />
            <br />
            <br />
            <div className='heading'>
                <p>SETP 2 OF 2</p>
                <h2>Choose the plan that’s right for you</h2>
            </div>
            <from>
                <div className='plan-container'>
                    {plan &&
                        plan.map((item, index) => (
                            <div key={index} className={`plan-card ${item.title === "Basic" ? "most-popular" : ""}`}>
                                <h2>{item.title}</h2>
                                <p>Price : <strong>{item.price}</strong></p>
                                <p>Resolution: <strong>{item.resolution}</strong></p>
                                <p>Sound Quality: <strong>{item.sound_quality}</strong></p>
                                <p>Supported Devices: <strong>{item.supported_devices}</strong></p>
                                <p>Connection : <strong>{item.connection}</strong></p>
                            </div>
                        ))
                    }
                </div>

                {/* <div className='Plans_details' >
                    <div class="plan-card mobile">
                        <div class="plan-header">
                            <h3>Mobile</h3>
                            <p>480p</p>
                        </div>
                        <div class="plan-details">
                            <p>Monthly price:<strong> ₹149</strong></p>
                            <p>Video and sound quality:<strong> Fair</strong></p>
                            <p>Resolution:<strong> 480p</strong></p>
                            <p>Supported devices:<strong> Mobile phone, tablet</strong></p>
                            <p>Devices your household can watch at the same time:<strong> 1</strong></p>
                        </div>
                    </div>
                    <div class="plan-card popular">
                        <div class="plan-header">
                            <h3>Basic</h3>
                            <p>720p</p>
                            <span class="popular-tag">Most Popular</span>
                        </div>
                        <div class="plan-details">
                            <p>Monthly price:<strong> ₹199</strong></p>
                            <p>Video and sound quality:<strong> Good</strong></p>
                            <p>Resolution:<strong> 720p (HD)</strong></p>
                            <p>Supported devices:<strong> TV, computer, mobile phone, tablet</strong></p>
                            <p>Devices your household can watch at the same time:<strong> 1</strong></p>
                        </div>
                    </div>
                    <div class="plan-card standard">
                        <div class="plan-header">
                            <h3>Standard</h3>
                            <p>1080p</p>
                        </div>
                        <div class="plan-details">
                            <p>Monthly price:<strong>  ₹499</strong></p>
                            <p>Video and sound quality:<strong>  Great</strong></p>
                            <p>Resolution:<strong>  1080p (Full HD)</strong></p>
                            <p>Supported devices:<strong>  TV, computer, mobile phone, tablet</strong></p>
                            <p>Devices your household can watch at the same time:<strong>  2</strong></p>
                        </div>
                    </div>
                    <div class="plan-card premium">
                        <div class="plan-header">
                            <h3>Premium</h3>
                            <p>4K + HDR</p>
                        </div>
                        <div class="plan-details">
                            <p>Monthly price:<strong> ₹649</strong></p>
                            <p>Video and sound quality:<strong> Best</strong></p>
                            <p>Resolution:<strong> 4K (Ultra HD) + HDR</strong></p>
                            <p>Spatial audio (immersive sound):<strong> Included</strong></p>
                            <p>Supported devices:<strong> TV, computer, mobile phone, tablet</strong></p>
                        </div>
                    </div>
                </div> */}
                <Link to='/login' type='button' className='paynowbtn'>Pay Now</Link>
            </from>
            <Footer settings={settings} />
        </div>

    )
}

export default Plan
