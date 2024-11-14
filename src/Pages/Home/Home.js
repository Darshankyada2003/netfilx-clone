import React from 'react'
import './Home.css'
import Navbar from '../../component/Navbar/Navbar'
import hero from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecard from '../../component/Titlecard/Titlecard'
import Footer from '../../component/Footer/Footer'


const Home = () => {
    return (
        <div className='Home'>
            <Navbar />
            <div className='hero'>
                <img src={hero} alt='' className='banner-img' />
                <div className='hero-caption'>
                    <img src={hero_title} alt='' className='caption-img' />
                    <p>Discovering hit ties to a secert ancient order, a young
                        man living in modern Istanbul embark on a quest to save the
                        city from an immortal enemy.</p>
                    <br />
                    <div className='hero-btn'>
                        <button className='btn'><img src={play_icon} alt='' />Play</button>
                        <button className='btn dark-btn'><img src={info_icon} alt='' />More Info</button>
                    </div>
                    <Titlecard />
                </div>
            </div>
            <div className='more-card'>
                <Titlecard title={"Blockbuster Movies"} category={"top_rated"} />
                <Titlecard title={"Only on Netfilx"} category={"popular"} />
                <Titlecard title={"Upcoming"} category={"upcoming"} />
                <Titlecard title={"Top Pics for You"} category={"now_playing"} />
            </div>
            <Footer />
        </div>
    )
}

export default Home
