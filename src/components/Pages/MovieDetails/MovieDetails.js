import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';

import Loader from 'components/Loader';

import { API_KEY, URL, IMG_URL } from 'components/CONST';
import s from './MovieDetails.module.css';

const MovieDetailCastSubView = lazy(() => import('../Cast/Cast'));
const MovieReviewsView = lazy(() => import('../Reviews'));

export default function MovieDetailView() {
  const [movie, setMovie] = useState(null);
  const [path, setPath] = useState('/');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();

  useEffect(() => {
    setStatus('pending');

    const axios = require('axios');

    async function getMovieById(movieId) {
      const url = `${URL}movie/${movieId}?api_key=${API_KEY}`;
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    }
    getMovieById(movieId).then(newMovie => {
      setMovie(newMovie);
      setStatus('resolved');
    });
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
            src={`${IMG_URL}${movie.poster_path}`}
            alt={movie.title}
            className={s.poster}
          />
          <div className={s.infoBlock}>
            <h2 className={s.title}>{movie.title}</h2>
            <p className={s.text}>Release date: {movie.release_date}</p>
            <p className={s.text}>
              <span className={s.text}>
                Vote - average / count : {movie.vote_average} /{' '}
              </span>
              <span className={s.text}>{movie.vote_count}</span>
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
          <Route
            path="cast"
            element={<MovieDetailCastSubView movieId={movieId} />}
          />
          <Route
            path="reviews"
            element={<MovieReviewsView movieId={movieId} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}
