import { Link, useLocation } from 'react-router-dom';

import { IMG_URL } from 'utils/constants';
import defaultImage from 'assets/images/movieNotFound.png';

import PropTypes from 'prop-types';
import s from './Gallery.module.css';

export default function Gallery({ movies }) {
  const location = useLocation();
  return (
    <>
      {movies.length === 0 && (
        <div className={s.list}>Not films for this search.</div>
      )}
      {movies.length > 0 && (
        <ul className={s.list}>
          {movies.map(({ id, title, poster_path }) => (
            <li key={id} className={s.item}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                <img
                  src={poster_path ? `${IMG_URL}${poster_path}` : defaultImage}
                  alt={title}
                  className={s.itemImage}
                />
                <p className={s.info}>{title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

Gallery.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      poster_path: PropTypes.string,
      title: PropTypes.string.isRequired,
    })
  ),
};
