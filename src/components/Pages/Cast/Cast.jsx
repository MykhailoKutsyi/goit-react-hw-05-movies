import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from 'components/Loader';

import { getCast } from 'services/API';
import { IMG_URL } from 'utils/constants';
import defaultImage from 'assets/images/defaultUserImage.png';

import s from './Cast.module.css';

export default function Cast() {
  const [cast, setCast] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');
    try {
      const response = getCast(movieId);
      return response.then(newData => {
        setCast(
          newData.data.cast.map(({ id, character, name, profile_path }) => ({
            id,
            character,
            name,
            profile_path,
          }))
        );
        setStatus('resolved');
      });
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
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
