import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';

const HomeView = lazy(() => import('./components/Pages/Home/Home'));
const MovieDetailView = lazy(() =>
  import('./components/Pages/MovieDetails/MovieDetails')
);
const FindMovies = lazy(() =>
  import('./components/Pages/FindMovies/FindMovies')
);
const NotFoundView = lazy(() => import('./components/Pages/NotFound/NotFound'));

export default function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" exact element={<HomeView />} />
          <Route path="movies" element={<FindMovies />} />
          <Route path="movies/:movieId/*" element={<MovieDetailView />}></Route>

          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
