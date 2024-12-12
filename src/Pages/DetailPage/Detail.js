import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";

const Detail = ({ settings }) => {

    const [movie, setMovie] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`)
            .then(res => {
                if (res.data.status) {
                    setMovie(res.data.data)
                }
            })
            .catch(err => {
                console.log("error for fetch movie id", err)
            })
    }, [id])
    return (

        <div className="details">
            <Navbar settings={settings} />
            {/* {settings && settings.data && (
                <img src={settings.data.logo} alt="" className="netflix-logo" />
            )} */}
            <br />
            <br />
            <br />
            {movie && (
                <div className="movie_detail">
                    <div className="imgORtitle">

                        <img src={movie.backdrop_path} alt="" className="movieimg" />
                    </div>
                    <div className="movie-details">
                        <h1 className="movie-title">{movie.title}</h1>
                        <p className="movie-overview">{movie.overview}</p>
                        <p className="movie-info">
                            Release Date: <span>{movie.release_date}</span>
                        </p>
                        <p className="movie-info">
                            Category: <span>{movie.category.join(" | ")}</span>
                        </p>
                        <p className="movie-info">
                            Language: <span>{movie.original_language}</span>
                        </p>
                        <p className="movie-info">
                            Rating: <span>{movie.vote_average}</span>
                        </p>
                        <p className="movie-info">
                            Review: <span>{movie.vote_count}</span>
                        </p>
                    </div>

                </div>
            )}
            <Footer settings={settings} />
        </div>

    )
}

export default Detail