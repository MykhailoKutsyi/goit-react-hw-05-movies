import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from 'components/Loader';

import { API_KEY, URL, IMG_URL } from 'components/CONST';
import defaultImage from '../../IMG/defaultUserImage.png';
import s from './Reviews.module.css';

export default function MovieDetailCastSubView() {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');

    const axios = require('axios');
    async function getMovieReviews(movieId) {
      const url = `${URL}movie/${movieId}/reviews?api_key=${API_KEY}`;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }

    getMovieReviews(movieId).then(newData => {
      setReviews(newData);
      setStatus('resolved');
    });
  }, [movieId]);

  return (
    <>
      {status === 'idle' && <></>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error}</h1>}
      {status === 'resolved' && reviews.results.length === 0 && (
        <div className={s.notFound}>Not reviews for this movie.</div>
      )}
      {status === 'resolved' && reviews && (
        <ul className={s.list}>
          {reviews.results.map(({ id, author, author_details, content }) => {
            const avatar =
              author_details.avatar_path === null
                ? false
                : author_details.avatar_path.startsWith('/https')
                ? author_details.avatar_path.substring(1)
                : `${IMG_URL}${author_details.avatar_path}`;

            return (
              <li key={id} className={s.item}>
                <div className={s.author}>
                  <img
                    src={avatar || defaultImage}
                    alt={author}
                    className={s.avatar}
                  />
                  <p className={s.nick}>{author}</p>
                </div>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
