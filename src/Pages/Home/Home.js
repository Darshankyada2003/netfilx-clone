import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import './Home.css'
import Navbar from '../../component/Navbar/Navbar'
import info_icon from '../../assets/info_icon.png'
import Footer from '../../component/Footer/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { IoIosPlay } from "react-icons/io";

const Home = ({ settings }) => {

    const [current, setCurrent] = useState(0);
    const [fade, setFade] = useState(false);
    const [category, setCategory] = useState([]);
    const [sliderImage, setSliderImage] = useState([]);
    const navigate = useNavigate();

    //Sliderimg 
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
        fatchHome();
        fatchTopImg();
    }, []);

    //Home GetApi
    const fatchHome = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/home`)
            if (res.data.status) {
                setCategory(res.data.data);
            }
        }
        catch (err) {
            console.log(err, "Error form HomeApi");
        }
    }

    //redirect to movie detail with useCallback hooks
    const handleclick = useCallback((movieID) => {
        navigate(`/movie/${movieID}`)
    }, [navigate]);

    //Movie scroll horizontal 
    const movieRef = useRef([]);
    useEffect(() => {
        const currentRef = movieRef.current;
        const handleWheel = (e, index) => {
            e.preventDefault();
            if (currentRef[index]) {
                currentRef[index].scrollLeft += e.deltaY;
            }
        };
        currentRef.forEach((ref, index) => {
            if (ref) {
                ref.addEventListener("wheel", (e) => handleWheel(e, index));
            }
        });
        return () => {
            currentRef.forEach((ref, index) => {
                if (ref) {
                    ref.removeEventListener("wheel", (e) => handleWheel(e, index));
                }
            });
        };
    }, [category])

    //TopImage getApi
    const fatchTopImg = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/topImages`)
            if (res.data.status) {
                setSliderImage(res.data.data);
            }
        }
        catch (err) {
            console.log(err, "Error form FatchTopimges API");
        }
    }

    //navigate to subscribeToWatch with useCallback Hooks
    const subscribeToWatch = useCallback(() => {
        navigate("/subscription")
    }, [navigate])

    //using useMemo hook thorugh sliderImg, current, and fade-in-out effect
    {/* Instead of recalculating the slider JSX every time the component renders, 
        use useMemo to memoize the slider content. This way,
        the slider JSX is only recalculated when sliderImage, current, or fade changes.
    */}
    const memoizeSliderImg = useMemo(() => {
        return (
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
                                    <p className={`caption-item ${fade ? 'fade' : 'fade-out'}`}>{item.release_date}</p>|
                                    <p className={`caption-item ${fade ? 'fade' : 'fade-out'}`}>{item.language}</p>|
                                    <p className={`caption-item ${fade ? 'fade' : 'fade-out'}`}>{item.duration}</p>
                                </div>
                                <br />
                                <p className={`caption-img ${fade ? 'fade' : 'fade-out'}`}>{item.description}</p>
                                <p className={`caption-img ${fade ? 'fade' : 'fade-out'}`}>{item.category.join(" | ")}</p>
                                <br />
                                <div className='hero-btn'>
                                    {item.isPlay && (
                                        <button className='btn' onClick={subscribeToWatch}><IoIosPlay className='play_icon' />Subscribe to Watch</button>
                                    )}
                                    {item.isMoreInfo && (<button className='btn dark-btn'><img src={info_icon} alt='' />More Info</button>)}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ))
        )
    }, [current, fade, sliderImage])

    //using useMemo hook through category with movie
    {/* 
    Without useMemo, the category.map() and nested movie.map() 
    would be recalculated on every render, even if category hasn’t changed. 
    By using useMemo, React will only recompute the categories when the category data itself changes,
    improving performance by avoiding unnecessary re-renders.
    */}
    const MemoizedCategories = useMemo(() => {
        return (
            category.map((category, index) => (
                <div key={index} className='title-cards'>
                    <h2>{category.title}</h2>
                    <h2>{category.name}</h2>
                    <div className='card-list' ref={(el) => movieRef.current[index] = el}>
                        {category.movies.length > 0 &&
                            category.movies.map((movie) => (
                                <div key={movie.id}
                                    onClick={() => handleclick(movie.id)}>
                                    <img src={movie.backdrop_path} alt='' className='listimg' />
                                    <p>{movie.title}</p>
                                </div>
                            ))}
                    </div>
                </div>
            ))
        )
    }, [category]);

    return (
        <div className='Home'>
            <Navbar settings={settings} />
            <div className='hero'>
                {memoizeSliderImg}
            </div>
            <div className='title-card-section'>
                {category.length > 0 && MemoizedCategories}
                <Footer settings={settings} />
            </div>
        </div>
    )
}

export default Home
