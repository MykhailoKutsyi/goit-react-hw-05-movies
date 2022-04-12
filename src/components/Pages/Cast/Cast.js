import { getMovieCast } from '../../API/fetchAPI';
import { useState, useEffect } from 'react';
// import { fetchmovies } from '../API/fetchAPI';
// import { Route } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { IMG_URL } from 'components/CONST';
// import { Link } from 'react-router-dom';
import s from './Cast.module.css';
import defaultImage from '../../IMG/defaultUserImage.png';

export default function MovieDetailCastSubView() {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieCast(movieId).then(setCast);
  }, [movieId]);
  console.log(cast);

  return (
    <>
      {cast && (
        <>
          <ul className={s.list}>
            {cast.cast.map(({ id, character, name, profile_path }) => {
              return (
                <li key={id} className={s.item}>
                  <img
                    src={
                      profile_path ? `${IMG_URL}${profile_path}` : defaultImage
                    }
                    width="300"
                    alt={name}
                    className={s.avatar}
                  />
                  <div className={s.content}>
                    <p className={s.name}>{name}</p>
                    <p className={s.character}>{character}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}
