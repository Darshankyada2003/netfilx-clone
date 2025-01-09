import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import './Detail.css'
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";
import Rating from "react-rating";

const Detail = ({ settings }) => {

    const [movie, setMovie] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        fatchMovie();
    }, [id])

    const fatchMovie = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`)
            if (res.data.status) {
                setMovie(res.data.data);
            }
        }
        catch (err) {
            console.log(err, "Error form fatchMovie API")
        }
    }

    const NumberFormat = useCallback((num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        } else {
            return num.toString();
        }
    }, []);

    const formateVouteCount = useMemo(() =>
        NumberFormat(movie?.vote_count || 0),
        [movie?.vote_count]);

    return (


        <div className="details">
            <Navbar settings={settings} />
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
                            Rating:
                            <span className="star-rating">
                                <Rating
                                    initialRating={movie.vote_average / 2}
                                    readonly
                                    emptySymbol={<span className="empty-symbol">☆</span>}
                                    fullSymbol={<span className="full-symbol">★</span>}
                                />
                            </span>
                        </p>
                        <p className="movie-info">
                            Review:
                            {formateVouteCount}
                        </p>
                    </div>
                </div>
            )}
            <Footer settings={settings} />
        </div>

    )
}

export default Detail