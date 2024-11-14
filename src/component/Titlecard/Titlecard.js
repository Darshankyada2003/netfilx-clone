import React, { useEffect, useRef } from 'react'
import './Titlecard.css'
//import card_data from '../../assets/cards/Cards_data'
import { Top_releted } from './Top_releted'
import { Now_playing } from './Now_playing'
import { Upcoming } from './Upcoming'
import { Popular } from './Popular'
import { Link } from 'react-router-dom'

const getDataByCategory = (category) => {
  switch (category) {
    case 'top_rated':
      return Top_releted;
    case 'popular':
      return Popular;
    case 'upcoming':
      return Upcoming;
    case 'now_playing':
      return Now_playing;
    default:
      return Now_playing;
  }
};
const Titlecard = ({ title, category }) => {

  useEffect(() => {
    const current = cardsRef.current;

    if (current) {
      current.addEventListener('wheel', handlewheel, { passive: false });
    }

    return () => {
      if (current) {
        current.removeEventListener('wheel', handlewheel);
      }
    }
  }, [])

  const cardsRef = useRef();
  const data = getDataByCategory(category);

  const handlewheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }


  /*  const [apidata, setApidata] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjBhY2EzMDU0NjI5OGIzNGFiYWVlODkxNDVkNWMwYiIsIm5iZiI6MTcyOTc2MDk0MS41MTg3MTQsInN1YiI6IjY3MWEwYmRmMjdiZDU3ZDkxZjYyNTI0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ameI5my8SXLdKPwlYi-5LkKuDMmsE--48cckmex29V8'
    }
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApidata(res.results))
      .catch(err => console.error('Fetch error:', err));
    cardsRef.current.addEventListener('wheel', handlewheel);
  }, [])
  
*/

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {data.map((card, index) => {

          //console.log(card);
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt='' />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default Titlecard
