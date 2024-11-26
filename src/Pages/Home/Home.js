import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../component/Navbar/Navbar'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Titlecard from '../../component/Titlecard/Titlecard'
import Footer from '../../component/Footer/Footer'
import sideshow1 from '../../assets/hero_banner.jpg'
import sideshow2 from '../../assets/the_wild_robot.jpg'
import sideshow3 from '../../assets/wp4074461.jpg'
import sideshow4 from '../../assets/money-heist.jpg'

const Home = ({ settings }) => {

    const sideshowimg = [
        sideshow1,
        sideshow2,
        sideshow3,
        sideshow4
    ]

    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrent((prevIndex) => (prevIndex + 1) % sideshowimg.length);
                setFade(true);

            }, 1000);

        }, 4000);
        return () => clearInterval(interval);
    }, [sideshowimg.length]);

    return (
        <div className='Home'>
            <Navbar settings={settings} />
            <div className='hero'>
                <img src={sideshowimg[current]} alt='' className= {`banner-img ${fade ? 'fade' : 'fade-out'}`}/>
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
            <Footer settings={settings} />
        </div>
    )
}

export default Home
