import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { useLocation, useSearchParams } from 'react-router-dom';

import form from './FindMovies.module.css';
import { getSearchMovie } from '../../API/fetchAPI';
import Gallery from '../../Gallery';

export default function FindMovies() {
  const [request, setRequest] = useState('');
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  const { search } = useLocation();
  // console.log('movies', movies);

  useEffect(() => {
    console.log(!search);
    if (!search) {
      return;
    }
    getSearchMovie(search.slice(8)).then(setMovies);
  }, [search]);

  console.log('search', search);

  const handleChange = e => {
    setRequest(e.currentTarget.value);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const handleSubmit = e => {
    e.preventDefault();
    setSearchParams({ request });
    console.log(searchParams);
    console.log(location);
    getSearchMovie(request.toLowerCase()).then(setMovies);
    reset();
  };
  console.log(location);

  const reset = () => {
    setRequest('');
  };

  const nameId = nanoid();
  console.log('movies', movies);
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
      <p>
        {/* <Link path="cast" className={s.link}>
          Cast
        </Link> */}
      </p>

      {movies && (
        <Gallery movies={movies} />
        // <ul className={s.list}>
        //   {movies.map(movie => (
        //     <li key={movie.id} className={s.item}>
        //       <Link to={`/movies/${movie.id}`} state={{ from: location }}>
        //         <img
        //           src={
        //             movie.poster_path
        //               ? `${IMG_URL}${movie.poster_path}`
        //               : defaultImage
        //           }
        //           alt={movie.title}
        //           className={s.itemImage}
        //         />
        //         <p className={s.info}>{movie.title}</p>
        //       </Link>
        //     </li>
        //   ))}
        // </ul>
      )}
    </>
  );
}
