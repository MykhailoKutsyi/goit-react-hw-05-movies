import { API_KEY, URL } from 'components/CONST';

const axios = require('axios');
export async function getMovies() {
  const url = `${URL}trending1/movie/day?api_key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMovieById(movieId) {
  console.log('it was getMovieById');
  const url = `${URL}movie/${movieId}?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Get the cast and crew for a movie.
export async function getMovieCast(movieId) {
  const url = `${URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

//Get the user reviews for a movie.
export async function getMovieReviews(movieId) {
  const url = `${URL}movie/${movieId}/reviews?api_key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

///search/movie
//Search for movies.
export async function getSearchMovie(movie) {
  console.log('movie', movie);
  const url = `${URL}search/movie/?api_key=${API_KEY}&query=${movie}`;
  try {
    const response = await axios.get(url);
    // console.log(response);
    return response.data.results;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// const BASE_URL = 'https://api.themoviedb.org/3';

// async function fetchWithErrorHandling(url = '') {
//   const response = await fetch(url);
//   console.log(response.ok);
//   if (response.ok) return await response.json();

//   // : Promise.reject(new Error('Not found'));
// }

// export function fetchFilms() {
//   return fetchWithErrorHandling(
//     `https://api.themoviedb.org/3/trending/all/day?api_key=e1780eaef9609cf3d5283262d6798136`
//   );
// }

// export default function fetchAPI() {}

//API key
//e1780eaef9609cf3d5283262d6798136
//example
//https://api.themoviedb.org/3/movie/550?api_key=e1780eaef9609cf3d5283262d6798136
//Ключ доступа к API (v4 auth)
//eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTc4MGVhZWY5NjA5Y2YzZDUyODMyNjJkNjc5ODEzNiIsInN1YiI6IjYyNTE4MTIwNjdlMGY3MTZlZGYzYzQwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5dX7hDqGnFQGYo6dus4sW95hbdxi_lqzOdiVVEmcUyI

// API Key: e1780eaef9609cf3d5283262d6798136

// Here's an example API request:

// https://api.themoviedb.org/3/movie/550?api_key=e1780eaef9609cf3d5283262d6798136
// Useful Links

// Documentation: https://developers.themoviedb.org/3/getting-started/introduction
// Support forum: https://www.themoviedb.org/talk/category/5047958519c29526b50017d6
// Wrappers & libraries: https://www.themoviedb.org/documentation/api/wrappers-libraries
// Service status: https://status.themoviedb.org
