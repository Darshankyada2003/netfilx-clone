import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
import Navbar from '../../component/Navbar/Navbar'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import Footer from '../../component/Footer/Footer'
import sideshow1 from '../../assets/hero_banner.jpg'
import sideshow2 from '../../assets/the_wild_robot.jpg'
import sideshow3 from '../../assets/wp4074461.jpg'
import sideshow4 from '../../assets/money-heist.jpg'
import axios from 'axios'

const Home = ({ settings }) => {

    const sideshowimg = [
        sideshow1,
        sideshow2,
        sideshow3,
        sideshow4
    ]

    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(false);
    const [category, setCategory] = useState([]);

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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/home`)
            .then(res => {
                if (res.data.status) {
                    console.log(res.data.data);
                    setCategory(res.data.data);
                }
            })
            .catch(err => {
                console.log("error", err);
            })
    }, []);

    const movieRef = useRef([]);

    useEffect(() => {
        const handleWheel = (e, index) => {
            e.preventDefault();
            if (movieRef.current[index]) {
                movieRef.current[index].scrollLeft += e.deltaY;
            }
        };

        movieRef.current.forEach((ref, index) => {
            if (ref) {
                ref.addEventListener("wheel", (e) => handleWheel(e, index));
            }
        });

        return () => {
            movieRef.current.forEach((ref, index) => {
                if (ref) {
                    ref.removeEventListener("wheel", (e) => handleWheel(e, index));
                }
            });
        };
    }, [category])

    return (
        <div className='Home'>
            <Navbar settings={settings} />
            <div className='hero'>
                <img src={sideshowimg[current]} alt='' className={`banner-img ${fade ? 'fade' : 'fade-out'}`} />
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
                </div>
            </div>
            <div className='title-card-section'>
                {category.length > 0 &&
                    category.map((category, index) => (
                        <div key={index} className='title-cards'>
                            <h2>{category.title}</h2>
                            <h2>{category.name}</h2>
                            <div className='card-list' ref={(el) => movieRef.current[index] = el}>
                                {category.movies.length > 0 &&
                                    category.movies.map((movie) => (
                                        <div key={movie.id} >
                                            <img src={movie.backdrop_path} alt='' />
                                            <p>{movie.title}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                <Footer settings={settings} />
            </div>
        </div>
    )
}

export default Home
