import { getMovieById } from '../../API/fetchAPI';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
// import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../../CONST';
import Loader from 'components/Loader';
import s from './MovieDetails.module.css';

const MovieDetailCastSubView = lazy(() => import('../Cast/Cast'));
const MovieReviewsView = lazy(() => import('../Reviews'));

export default function MovieDetailView() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const location = useLocation();
  // let navigate = useNavigate();

  const [path, setPath] = useState('/');

  // console.log(location, 'location');

  // useEffect(() => {
  // setPath(location?.state?.from + location?.state?.search);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // console.log('path', path);
  // const navigate = useNavigation();
  // const navigation = useNavigation();
  // console.log(navigation);
  // const history = useHistory();

  useEffect(() => {
    getMovieById(movieId).then(setMovie);
    // setPath(location?.state?.from ?? '/');
  }, [movieId]);

  useEffect(() => {
    setPath(location?.state?.from ?? '/');
  }, [location?.state?.from]);

  console.log(path);

  const onGoBack = () => {
    console.log(location, 'location');
    console.log('location?.state?.from', location?.state?.from);
  };

  console.log('location?.state?.from', location?.state?.from);

  return (
    <div className={s.MovieDetail}>
      <button type="button" onClick={onGoBack}>
        Back
      </button>
      <Link
        to={{
          pathname: path,
        }}
      >
        Back
      </Link>
      {movie && (
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

      <hr />
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
