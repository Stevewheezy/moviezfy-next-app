import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;


export const fetchMovies = async (genreId?: string) => {
  try {
    const url = genreId
      ? `${API_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
      : `${API_URL}/movie/popular?api_key=${API_KEY}`;
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${API_URL}/genre/movie/list?api_key=${API_KEY}`);
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

export const searchMovies = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
