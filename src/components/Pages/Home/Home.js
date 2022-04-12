import { getMovies } from '../../API/fetchAPI';
import { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';
import { IMG_URL } from 'components/CONST';
import s from './Home.module.css';
import defaultImage from '../../IMG/movieNotFound.png';

export default function HomeView() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();
  // const [path, setPath] = useState('/');

  // console.log('location', location);
  // const { url } = useMatch();
  // console.log(useMatch('/hot/:item'));
  useEffect(() => {
    getMovies().then(setMovies);
  }, []);
  console.log(movies);
  // console.log(useMatch());
  console.log(location.pathname);
  return (
    <>
      <ul className={s.list}>
        {movies &&
          movies.map(({ id, title, original_name, poster_path }) => {
            return (
              <li key={id} className={s.item}>
                <Link
                  to={{
                    pathname: `/movies/${id}`,
                  }}
                  state={{ from: location.pathname }}
                >
                  <img
                    src={
                      poster_path ? `${IMG_URL}${poster_path}` : defaultImage
                    }
                    alt={title}
                    className={s.itemImage}
                  />
                  <p className={s.info}>{title ?? original_name} </p>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
