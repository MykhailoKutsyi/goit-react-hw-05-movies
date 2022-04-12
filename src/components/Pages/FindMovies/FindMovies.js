import { useState } from 'react';
import { nanoid } from 'nanoid';
import { Link, useLocation } from 'react-router-dom';

import form from './FindMovies.module.css';
import s from '../Home/Home.module.css';
// import PropTypes from 'prop-types';
import { getSearchMovie } from '../../API/fetchAPI';
import { IMG_URL } from 'components/CONST';
import defaultImage from '../../IMG/movieNotFound.png';

export default function FindMovies() {
  const [request, setRequest] = useState('');
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  // console.log('movies', movies);

  const handleChange = e => {
    setRequest(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    getSearchMovie(request.toLowerCase()).then(setMovies);
    reset();
  };

  const reset = () => {
    setRequest('');
  };

  const nameId = nanoid();

  return (
    <>
      <form onSubmit={handleSubmit} className={form.SearchForm}>
        <button type="submit" className={form.SearchFormButton}>
          <span className={form.SearchFormButtonLabel}></span>
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
            className={form.SearchFormInput}
            required
          />
        </label>
      </form>
      {movies && (
        <ul className={s.list}>
          {movies.map(movie => (
            <li key={movie.id} className={s.item}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location.pathname }}
              >
                <img
                  src={
                    movie.poster_path
                      ? `${IMG_URL}${movie.poster_path}`
                      : defaultImage
                  }
                  alt={movie.title}
                  className={s.itemImage}
                />
                <p className={s.info}>{movie.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
