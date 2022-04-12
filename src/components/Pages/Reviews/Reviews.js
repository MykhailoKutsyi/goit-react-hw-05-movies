import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../API/fetchAPI';
import { IMG_URL } from 'components/CONST';
import defaultImage from '../../IMG/defaultUserImage.png';
import s from './Reviews.module.css';

export default function MovieDetailCastSubView() {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews);
  }, [movieId]);
  console.log('reviews', reviews);

  return (
    <>
      {reviews && reviews.results.length === 0 && (
        <div className={s.notFound}>Not reviews for this movie.</div>
      )}
      {reviews && (
        <>
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
                      width="100"
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
        </>
      )}
    </>
  );
}
