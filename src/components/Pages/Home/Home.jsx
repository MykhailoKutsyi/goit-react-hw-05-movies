import { useState, useEffect } from 'react';
import { API_KEY, URL } from 'components/CONST';

import Gallery from '../../Gallery';
import Loader from 'components/Loader';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    const axios = require('axios');
    const url = `${URL}trending/movie/day?api_key=${API_KEY}`;
    setStatus('pending');
    try {
      const response = axios.get(url);
      return response.then(newData => {
        setMovies(newData.data.results);
        setStatus('resolved');
      });
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  }, []);

  return (
    <>
      {status === 'idle' && <></>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error}</h1>}
      {status === 'resolved' && movies && <Gallery movies={movies} />}
    </>
  );
}
