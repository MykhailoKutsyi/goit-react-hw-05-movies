import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

import Loader from 'components/Loader';

import { getMovieById } from 'services/API';
import { IMG_URL } from 'utils/constants';
import s from './MovieDetails.module.css';

const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews'));

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [path, setPath] = useState('/');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setStatus('pending');
    try {
      const response = getMovieById(movieId);
      return response.then(
        ({
          data: {
            id,
            poster_path,
            title,
            genres,
            release_date,
            vote_average,
            vote_count,
            overview,
            budget,
          },
        }) => {
          setMovie({
            id,
            poster: poster_path,
            title: title,
            genres,
            releaseDate: release_date,
            voteAverage: vote_average,
            voteCount: vote_count,
            overview,
            budget,
          });
          setStatus('resolved');
        }
      );
    } catch (error) {
      setError(error);
      setStatus('rejected');
    }
  }, [movieId]);

  useEffect(() => {
    if (!location?.state?.from) {
      return;
    }
    setPath(
      location?.state?.from?.pathname + location?.state?.from?.search ?? '/'
    );
  }, [location?.state?.from]);

  return (
    <div className={s.MovieDetail}>
      <Link to={path} className={s.linkButton}></Link>
      {status === 'idle' && <></>}
      {status === 'pending' && <Loader />}
      {status === 'rejected' && <h1>{error}</h1>}
      {status === 'resolved' && movie && (
        <div className={s.detailsBlock}>
          <img
            src={`${IMG_URL}${movie.poster}`}
            alt={movie.title}
            className={s.poster}
          />
          <div className={s.infoBlock}>
            <h2 className={s.title}>{movie.title}</h2>
            <p className={s.text}>Release date: {movie.release_date}</p>
            <p className={s.text}>
              <span className={s.text}>
                Vote - average / count : {movie.voteAverage} /{' '}
              </span>
              <span className={s.text}>{movie.voteCount}</span>
            </p>
            <p className={s.text}>
              Genres:
              {movie.genres.map(genre => genre.name).join(', ')}
            </p>
            <p className={s.text}>Overview : {movie.overview}</p>
            <p className={s.text}>
              Budget, $ : {movie.budget !== 0 ? movie.budget : `Don't remember`}
            </p>
          </div>
        </div>
      )}
      <div className={s.linkBlock}>
        <p>
          <Link to="cast" className={s.link}>
            Cast
          </Link>
        </p>
        <p>
          <Link to="reviews" className={s.link}>
            Reviews
          </Link>
        </p>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<Cast movieId={movieId} />} />
          <Route path="reviews" element={<Reviews movieId={movieId} />} />
        </Routes>
      </Suspense>
    </div>
  );
}
