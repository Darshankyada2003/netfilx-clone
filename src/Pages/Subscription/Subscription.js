import React, { useEffect } from 'react'
import './Subscription.css'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../component/Navbar/Navbar';
import Footer from '../../component/Footer/Footer';



const Subscription = ({ settings }) => {

    useEffect(() => {
        document.title = "Netflix - Subscription";
    })

    return (
        <div>
            <div className='subscription'>
                <Navbar settings={settings} />
                <div className='plan'>
                    <p>STEP 1 OF 2</p>
                    <br />
                    <h2>Choose your plan</h2>
                    <ul>
                        <li>No commitments, cancel anytime.</li>
                        <li>Everything on Netflix for one low price.</li>
                        <li>No ads and no extra fees. Ever.</li>
                    </ul>
                    &nbsp;
                    <Link to='/Plan' type='button' className='subscriptionbtn'>Next</Link>
                </div>
            </div>
            <Footer settings={settings} />
        </div>
    )
}

export default Subscription
