import { API_KEY, URL } from 'utils/constants';

const axios = require('axios');

export const getTrendingMovies = () => {
  const url = `${URL}trending/movie/day?api_key=${API_KEY}`;
  const response = axios.get(url);
  return response;
};
export const getCast = movieId => {
  const url = `${URL}movie/${movieId}/credits?api_key=${API_KEY}`;
  const response = axios.get(url);
  return response;
};
export const getReviews = movieId => {
  const url = `${URL}movie/${movieId}/reviews?api_key=${API_KEY}`;
  const response = axios.get(url);
  return response;
};
export const getMovieById = movieId => {
  const url = `${URL}movie/${movieId}?api_key=${API_KEY}`;
  const response = axios.get(url);
  return response;
};
export const getSearchMovie = movie => {
  const url = `${URL}search/movie?api_key=${API_KEY}&query=${movie}`;
  const response = axios.get(url);
  return response;
};
