import { useState, useEffect } from 'react';

import Gallery from '../../Gallery';
import Loader from 'components/Loader';

import { getTrendingMovies } from 'services/API';

export default function Home() {
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    setStatus('pending');
    try {
      const response = getTrendingMovies();
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
