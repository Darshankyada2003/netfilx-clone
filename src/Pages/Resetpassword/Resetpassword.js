import React from "react";
import './Resetpassword.css'


const Reset = ({ settings }) => {

    return (
        <div className="Resetpassword">
            {settings && settings.data && settings.data[0].logo && (<img src={settings.data[0].logo} alt='' className='login-logo' />)}
            <div className='resetpassword-form'>
                <h1>Reset password</h1>
                <form>
                    <input type='new-password' placeholder='Password' />
                    <input type='confirm-password' placeholder='Confirm Password' />
                    <button type='submit'>Change password</button>
                </form>
            </div>
        </div>

    )
}
export default Reset