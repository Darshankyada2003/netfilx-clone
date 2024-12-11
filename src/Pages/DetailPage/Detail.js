import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Detail = ({ settings }) => {

    const [movie, setMovie] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/movies/${id}`)
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
        <div>
            {settings && settings.data && (
                <img src={settings.data.logo} alt="" className="netflix-logo" />
            )}
            {movie &&(
                <div className="movie-detail">
                    <h1>{movie.title}</h1>
                </div>
            )}
        </div>
    )
}

export default Detail