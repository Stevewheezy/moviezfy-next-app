"use client";

import { useEffect, useState } from "react";
import { fetchMovies, fetchGenres, searchMovies } from "./services/tmdb";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-top: 80px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: white;
  text-align: center;
  margin-bottom: 20px;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const MovieCard = styled.div`
  background: #222;
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const MovieTitle = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  color: white;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const GenreSelect = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  color: white;
  display: block;
  margin-bottom: 10px;
`;

// Component Function
export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadGenres = async () => {
      const genreList = await fetchGenres();
      setGenres(genreList);
    };

    const loadMovies = async () => {
      const movieList = await fetchMovies();
      setMovies(movieList);
    };

    loadGenres();
    loadMovies();
  }, []);

  // Handle Genre Change
  const handleGenreChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    if (genreId) {
      const movieList = await fetchMovies(genreId);
      setMovies(movieList);
    } else {
      const movieList = await fetchMovies();
      setMovies(movieList);
    }
  };

  // Handle Search Input
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.length > 2) {
      const results = await searchMovies(query);
      setMovies(results);
    } else {
      const movieList = await fetchMovies();
      setMovies(movieList);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Title>Popular Movies</Title>

        {/* Search Input */}
        <StyledLabel htmlFor="search-input">Search for a movie:</StyledLabel>
        <SearchInput
          id="search-input"
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearch}
        />

        {/* Genre Dropdown */}
        <StyledLabel htmlFor="genre-select">Select Genre:</StyledLabel>
        <GenreSelect
          id="genre-select"
          name="genre-select"
          title="Select a genre"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </GenreSelect>

        {/* Movie Grid */}
        <MovieGrid>
          {movies.map((movie) => (
            <MovieCard key={movie.id}>
              <MovieImage
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <MovieTitle>{movie.title}</MovieTitle>
            </MovieCard>
          ))}
        </MovieGrid>
      </Container>
      <Footer />
    </>
  );
}
// The above code is a simple movie search application using React and styled-components.