import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from 'components/Loader';

import { API_KEY, URL, IMG_URL } from 'components/CONST';
import defaultImage from '../../IMG/defaultUserImage.png';
import s from './Cast.module.css';

export default function MovieDetailCastSubView() {
  const [cast, setCast] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');
    const axios = require('axios');

    async function getMovieCast(movieId) {
      const url = `${URL}movie/${movieId}/credits?api_key=${API_KEY}`;
      try {
        const response = await axios.get(url);
        return response.data.cast;
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }

    getMovieCast(movieId).then(newData => {
      setCast(newData);
      setStatus('resolved');
    });
  }, [movieId]);

  return (
    <>
      {status === 'idle' && <></>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error}</h1>}
      {status === 'resolved' && cast.length === 0 && (
        <div className={s.notFound}>
          This paragraph is empty for this movie.
        </div>
      )}
      {status === 'resolved' && cast && (
        <ul className={s.list}>
          {cast.map(({ id, character, name, profile_path }) => (
            <li key={id} className={s.item}>
              <img
                src={profile_path ? `${IMG_URL}${profile_path}` : defaultImage}
                alt={name}
                className={s.avatar}
              />
              <div className={s.content}>
                <p className={s.name}>{name}</p>
                <p className={s.character}>{character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
