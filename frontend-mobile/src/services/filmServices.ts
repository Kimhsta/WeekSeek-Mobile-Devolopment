import api, { API_URL } from './api';
import { Film } from '../types/film';

export const getAllFilms = async (): Promise<Film[]> => {
  const res = await api.get('/films');
  // Tambahkan path lengkap ke poster
  return res.data.map((film: Film) => ({
    ...film,
    poster: `${API_URL.replace('/api', '')}/uploads/posters/${film.poster}`,
  }));
};

export const getFilmById = async (id: number): Promise<Film> => {
  const res = await api.get(`/films/${id}`);
  const film = res.data;
  return {
    ...film,
    poster: `${API_URL.replace('/api', '')}/uploads/posters/${film.poster}`,
  };
};

export const searchFilms = async (query: string): Promise<Film[]> => {
  const res = await api.get(`/films/search?q=${encodeURIComponent(query)}`);
  return res.data.map((film: Film) => ({
    ...film,
    poster: `${API_URL.replace('/api', '')}/uploads/posters/${film.poster}`,
  }));
};

// ADMIN ONLY
export const addFilm = async (data: FormData) => {
  return api.post('/films', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateFilm = async (id: number, data: FormData) => {
  return api.put(`/films/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteFilm = async (id: number) => {
  return api.delete(`/films/${id}`);
};
