import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Loader from 'components/Loader';

import { getReviews } from 'services/API';
import { IMG_URL } from 'utils/constants';
import defaultImage from 'assets/images/defaultUserImage.png';

import s from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setStatus('pending');
    try {
      const response = getReviews(movieId);
      return response.then(newData => {
        setReviews(newData.data.results);
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
      {status === 'resolved' && reviews.length === 0 && (
        <div className={s.notFound}>Not reviews for this movie.</div>
      )}
      {status === 'resolved' && reviews && (
        <ul className={s.list}>
          {reviews.map(({ id, author, author_details, content }) => {
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
