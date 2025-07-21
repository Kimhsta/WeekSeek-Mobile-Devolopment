// types/film.ts
export interface Film {
  id: number;
  title: string;
  description?: string;
  genre?: string;
  releaseYear?: number;
  duration?: number;
  views: number;
  posterUrl: string;
  trailerUrl?: string;
}
