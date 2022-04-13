import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Container from './Container';
import AppBar from './AppBar';
import Loader from './Loader';

const HomeView = lazy(() => import('./Pages/Home/Home'));
const MovieDetailView = lazy(() => import('./Pages/MovieDetails/MovieDetails'));
const FindMovies = lazy(() => import('./Pages/FindMovies/FindMovies'));
const NotFoundView = lazy(() => import('./Pages/NotFound/NotFound'));

export default function App() {
  return (
    <>
      <Container>
        <AppBar />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" exact element={<HomeView />} />
            <Route path="/movies" element={<FindMovies />} />
            <Route
              path="/movies/:movieId/*"
              element={<MovieDetailView />}
            ></Route>

            <Route path="*" element={<NotFoundView />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
