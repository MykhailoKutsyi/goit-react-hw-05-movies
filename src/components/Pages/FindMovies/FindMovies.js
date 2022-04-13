import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import Gallery from '../../Gallery';
import Loader from 'components/Loader';

import { API_KEY, URL } from 'components/CONST';
import s from './FindMovies.module.css';

export default function FindMovies() {
  const [request, setRequest] = useState('');
  const [movies, setMovies] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { search } = useLocation();

  useEffect(() => {
    if (!search) {
      return;
    }
    const axios = require('axios');
    async function getSearchMovie(movie) {
      console.log('movie', movie);
      const url = `${URL}search/movie/?api_key=${API_KEY}&query=${movie}`;
      try {
        const response = await axios.get(url);
        return response.data.results;
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }

    setStatus('pending');
    getSearchMovie(search.slice(8)).then(newData => {
      setMovies(newData);
      setStatus('resolved');
    });
  }, [search]);

  const handleChange = e => {
    setRequest(e.currentTarget.value);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ request: request.toLowerCase() });
    reset();
  };

  const reset = () => {
    setRequest('');
  };

  const nameId = nanoid();
  return (
    <>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>

        <label htmlFor={nameId}>
          <input
            type="text"
            autoComplete="off"
            name="request"
            value={request}
            onChange={handleChange}
            id={nameId}
            autoFocus
            placeholder="Search films"
            className={s.SearchFormInput}
            required
          />
        </label>
      </form>

      {status === 'idle' && <></>}
      {status === 'pending' && <Loader />}
      {status === 'pending' && <h1>{error}</h1>}
      {status === 'resolved' && movies && <Gallery movies={movies} />}
    </>
  );
}
