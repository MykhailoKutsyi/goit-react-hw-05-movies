import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

import Gallery from '../../Gallery';
import Loader from 'components/Loader';

import { getSearchMovie } from 'services/API';
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
    setStatus('pending');
    setRequest(search.slice(9));
    try {
      const response = getSearchMovie(search.slice(9));
      return response.then(newData => {
        setMovies(newData.data.results);
        setStatus('resolved');
      });
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  }, [search]);

  const handleChange = e => {
    setRequest(e.currentTarget.value);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ request: request.toLowerCase() });
    console.log(searchParams);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}></span>
        </button>

        <label>
          <input
            type="text"
            autoComplete="off"
            name="request"
            value={request}
            onChange={handleChange}
            autoFocus
            placeholder="Search films"
            className={s.SearchFormInput}
            required
          />
        </label>
      </form>

      {status === 'idle' && <></>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error}</h1>}
      {status === 'resolved' && movies && <Gallery movies={movies} />}
    </>
  );
}
