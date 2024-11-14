import React from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate } from 'react-router-dom'

const Player = () => {

  //const { id } = useParams();

  const video = {
    name: "Money Heist | Series Trailer | Netflix",
    id: "_InqQJRqGW4",
    published_at: "2021-12-01",
    type: "Trailer"
  }
  const navigate = useNavigate();

  const handleback = () => {
    navigate("/");
  }
  /*
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjBhY2EzMDU0NjI5OGIzNGFiYWVlODkxNDVkNWMwYiIsIm5iZiI6MTcyOTgzNjQ3Ni4zMDE3OTcsInN1YiI6IjY3MWEwYmRmMjdiZDU3ZDkxZjYyNTI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H_h8yn3QgFgGiFBwLTLKWNhgfolAufII-lixZpIgrJY'
    }
  }; 


  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/912649/videos?language=en-US', options)
      .then(res => res.json())
      .then(res => setApi(res.results[0]))
      .catch(err => console.error(err));
  }, [])*/

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt='' onClick={handleback} />
      <iframe width='90%' height='90%' src={`https://www.youtube.com/embed/${video.id}`} title='trailer' frameBorder='0' allowFullScreen />
      <div className='player-info'>
        <p>{video.published_at}</p>
        <p>{video.name}</p>
        <p>{video.type}</p>
      </div>
    </div>
  )
}

export default Player
