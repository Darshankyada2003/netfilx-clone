import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import instagram_icon from '../../assets/instagram_icon.png'
import facebook_icon from '../../assets/facebook_icon.png'


const Footer = ({ settings }) => {

  return (
    <div className='footer'>
      <div className='footer-icon'>
        {settings && settings.data && (
          <>
            {
              settings.data[0].facebook && (
                <a href={settings.data[0].facebook} target="_blank" rel="noopener noreferrer">
                  <img src={facebook_icon} alt='' />
                </a>
              )
            }
            {
              settings.data[0].instagram && (
                <a href={settings.data[0].instagram} target="_blank" rel="noopener noreferrer">
                  < img src={instagram_icon} alt='' />
                </a>
              )
            }
            {
              settings.data[0].twitter && (
                <a href={settings.data[0].twitter} target="_blank" rel="noopener noreferrer">
                  <img src={twitter_icon} alt='' />
                </a>
              )
            }
            {
              settings.data[0].linkedIn && (
                <a href={settings.data[0].linkedIn} target="_blank" rel="noopener noreferrer">
                  <img src={youtube_icon} alt='' />
                </a>
              )
            }
          </>
        )}
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Center</li>
        <li>Gift Cards</li>
        <li>Media Center </li>
        <li>Investor Relations</li>
        <li>Jobs</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookie Preferences</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>© 1997-2024 Netfilx, Inc.</p>
    </div>
  )
}

export default Footer
