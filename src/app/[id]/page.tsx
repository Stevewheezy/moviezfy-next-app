"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchMovies } from "../services/tmdb";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  text-align: center;
`;

const MovieImage = styled.img`
  width: 100%;
  border-radius: 10px;
`;

const MovieTitle = styled.h1`
  font-size: 2rem;
  color: white;
`;

const MovieDescription = styled.p`
  font-size: 1rem;
  color: #ccc;
`;

export default function MovieDetail() {
  const { id } = useParams();
  interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  }

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function getMovie() {
      const data = await fetchMovies();
    interface Movie {
        id: number;
        title: string;
        overview: string;
        poster_path: string;
    }

                const selectedMovie: Movie | undefined = (data as Movie[]).find((m: Movie) => m.id.toString() === id);
      setMovie(selectedMovie || null);
    }
    if (id) getMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <Container>
      <MovieTitle>{movie.title}</MovieTitle>
      <MovieImage src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <MovieDescription>{movie.overview}</MovieDescription>
    </Container>
  );
}
