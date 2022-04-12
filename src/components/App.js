import React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './Loader';

import Container from './Container';
import AppBar from './AppBar';

// import HomeView from './Pages/HomeView';
// import MovieDetailView from './Pages/MovieDetailView';
// import NotFoundView from './Pages/NotFoundView';
// import FindMovies from './Pages/FindMovies/FindMovies';

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

            <Route element={<NotFoundView />} />
          </Routes>
        </Suspense>
      </Container>
    </>
  );
}
