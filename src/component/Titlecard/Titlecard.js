import React, { useEffect, useRef } from 'react'
import './Titlecard.css'
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

  const handlewheel = (e) => {
    e.preventDefault();
    cardsRef.current.scrollLeft += e.deltaY;
  }

  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className='card-list' ref={cardsRef}>
       
      </div>
    </div>
  ) 
}

export default Titlecard
