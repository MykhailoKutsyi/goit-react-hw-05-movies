import { Link, useLocation } from 'react-router-dom';

import { IMG_URL } from 'components/CONST';
import defaultImage from '../IMG/movieNotFound.png';
import s from './Gallery.module.css';

export default function Gallery({ movies }) {
  console.log(movies);
  const location = useLocation();
  return (
    <ul className={s.list}>
      {movies.map(({ id, title, original_name, poster_path }) => (
        <li key={id} className={s.item}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <img
              src={poster_path ? `${IMG_URL}${poster_path}` : defaultImage}
              alt={title}
              className={s.itemImage}
            />
            <p className={s.info}>{title ?? original_name}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
