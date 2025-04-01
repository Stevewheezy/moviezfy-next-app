"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchMovies } from "../services/tmdb";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  padding-top: 80px; /* Adjust for fixed navbar */
  text-align: center;
`;

const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const MovieImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
`;

const MovieDetails = styled.div`
  flex: 1;
  padding: 20px;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const MovieTitle = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 10px;
`;

const MovieDescription = styled.p`
  font-size: 1rem;
  color: #ccc;
  line-height: 1.6;
`;

const MovieInfo = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #aaa;
`;

export default function MovieDetail() {
  const { id } = useParams();
  interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function getMovie() {
      const data = await fetchMovies();
      const selectedMovie: Movie | undefined = (data as Movie[]).find(
        (m: Movie) => m.id.toString() === id
      );
      setMovie(selectedMovie || null);
    }
    if (id) getMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <Container>
        <MovieWrapper>
          <MovieImage
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <MovieDetails>
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieDescription>{movie.overview}</MovieDescription>
            <MovieInfo>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
            </MovieInfo>
          </MovieDetails>
        </MovieWrapper>
      </Container>
    </>
  );
}