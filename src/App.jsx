import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';

const Home = lazy(() => import('./components/pages/Home/Home'));
const MovieDetail = lazy(() =>
  import('./components/pages/MovieDetails/MovieDetails')
);
const FindMovies = lazy(() =>
  import('./components/pages/FindMovies/FindMovies')
);
const NotFoundView = lazy(() => import('./components/pages/NotFound/NotFound'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movies" element={<FindMovies />} />
          <Route path="movies/:movieId/*" element={<MovieDetail />}></Route>

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
