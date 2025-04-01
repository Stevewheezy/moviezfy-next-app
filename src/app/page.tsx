"use client";

import { useEffect, useState } from "react";
import { fetchMovies, fetchGenres, searchMovies } from "./services/tmdb";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link"; // Import Link from next/link

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
  cursor: pointer; /* Add pointer cursor for better UX */
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05); /* Slight zoom effect on hover */
  }
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
  width: 60%; /* Moderate width */
  max-width: 500px; /* Prevents it from becoming too wide */
  padding: 12px;
  font-size: 16px;
  border: 1px solid #444;
  border-radius: 25px;
  outline: none;
  background-color: #333;
  color: white;
  display: block;
  margin: 10px auto; /* Centered */
  transition: all 0.3s ease-in-out;

  &:focus {
    border-color: #ff9800;
    box-shadow: 0 0 10px rgba(255, 152, 0, 0.8);
  }
`;

const GenreSelect = styled.select`
  width: 60%;
  max-width: 500px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #444;
  border-radius: 25px;
  outline: none;
  background-color: #333;
  color: white;
  display: block;
  margin: 10px auto;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #ff9800;
  }
`;

const StyledLabel = styled.label`
  color: white;
  display: block;
  margin-bottom: 10px;
`;

// Component Function
export default function Home() {
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  interface Genre {
    id: number;
    name: string;
  }

  const [genres, setGenres] = useState<Genre[]>([]);
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
          aria-label="Select a genre"
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
            <Link key={movie.id} href={`/${movie.id}`} passHref>
              <MovieCard>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieCard>
            </Link>
          ))}
        </MovieGrid>
      </Container>
      <Footer />
    </>
  );
}