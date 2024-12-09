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

    // const sideshowimg = [
    //     sideshow1,
    //     sideshow2,
    //     sideshow3,
    //     sideshow4
    // ]

    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(false);
    const [category, setCategory] = useState([]);
    const [sliderImage, setSliderImage] = useState([]);

    useEffect(() => {
        setFade(true);
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrent((prevIndex) => (prevIndex + 1) % sliderImage.length);
                setFade(true);
            }, 1000);
        }, 4000);
        return () => clearInterval(interval);
    }, [sliderImage.length]);

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

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/topImages`)
            .then(res => {
                if (res.data.status) {
                    setSliderImage(res.data.data);
                    console.log(res.data.data);
                }
            })
            .catch(err => {
                console.log(err, "error");

            });
    }, [])

    return (
        <div className='Home'>
            <Navbar settings={settings} />
            <div className='hero'>
                {sliderImage &&
                    sliderImage.map((item, index) => (
                        <div key={index} className=''>
                            {index === current && (
                                <>
                                    {item.isImage ? (
                                        <img
                                            src={item.image}
                                            alt=''
                                            className={`banner-img ${fade ? 'fade' : 'fade-out'}`} />
                                    ) : (
                                        <video loop autoPlay muted
                                            className={`banner-img ${fade ? 'fade' : 'fade-out'}`} >
                                            <source src={item.image} alt='' type='video/mp4' />
                                        </video>
                                    )}
                                    <div className='hero-caption'>
                                        <h2 className={`caption-img ${fade ? 'fade' : 'fade-out'}`}>{item.title}</h2>
                                        <div className={`caption-row ${fade ? 'fade' : 'fade-out'}`}>
                                            <p className={`caption-item ${fade ? 'fade' : 'fade-out'}`}>{item.release_date}</p>
                                            <p className={`caption-item ${fade ? 'fade' : 'fade-out'}`}>{item.language}</p>
                                            <p className={`caption-item ${fade ? 'fade' : 'fade-out'}`}>{item.duration}</p>
                                        </div>
                                        <br />
                                        <p className={`caption-img ${fade ? 'fade' : 'fade-out'}`}>{item.description}</p>
                                        <p className={`caption-img ${fade ? 'fade' : 'fade-out'}`}>{item.category.join(" | ")}</p>
                                        <br />
                                        <div className='hero-btn'>
                                            {item.isPlay && (
                                                <button className='btn'><img src={play_icon} alt='' />Play</button>
                                            )}
                                            {item.isMoreInfo && (<button className='btn dark-btn'><img src={info_icon} alt='' />More Info</button>)}
                                        </div>
                                    </div>

                                </>
                            )}
                        </div>
                    ))
                }
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
