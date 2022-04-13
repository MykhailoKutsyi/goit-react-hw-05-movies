import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { API_KEY, URL } from 'components/CONST';

// import { getMovies } from '../../API/fetchAPI';
// import { IMG_URL } from 'components/CONST';
// import defaultImage from '../../IMG/movieNotFound.png';
// import s from '../../Gallery/Gallery.module.css';
import Gallery from '../../Gallery';

const axios = require('axios');
async function getMovies() {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  useEffect(() => {
    // setStatus
    getMovies().then(setMovies);
  }, []);
  console.log(movies);

  return (
    <>
      {status === 'idle' && <></>}
      {status === 'idle' && <></>}
      {movies && <Gallery movies={movies} />}
    </>
  );
}
