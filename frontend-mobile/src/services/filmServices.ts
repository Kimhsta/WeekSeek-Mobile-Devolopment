import api, { API_URL } from './api';
import { Film } from '../types/film';

export const getAllFilms = async (): Promise<Film[]> => {
  const res = await api.get<Film[]>('/films');
  return res.data.map((film) => ({
    ...film,
    posterUrl: `${API_URL.replace('/api', '')}/uploads/posters/${film.posterUrl}`,
  }));
};

export const getFilmById = async (id: number): Promise<Film> => {
  const res = await api.get<Film>(`/films/${id}`);
  const film = res.data;
  return {
    ...film,
    posterUrl: `${API_URL.replace('/api', '')}/uploads/posters/${film.posterUrl}`,
  };
};

export const searchFilms = async (query: string): Promise<Film[]> => {
  const res = await api.get<Film[]>(`/films/search?q=${encodeURIComponent(query)}`);
  return res.data.map((film) => ({
    ...film,
    posterUrl: `${API_URL.replace('/api', '')}/uploads/posters/${film.posterUrl}`,
  }));
};

// ADMIN ONLY
export const addFilm = async (data: FormData) => {
  return api.post('/films', data, {
    transformRequest: (d) => d,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateFilm = async (id: number, data: FormData) => {
  return api.put(`/films/${id}`, data, {
    transformRequest: (d) => d,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};


export const deleteFilm = async (id: number) => {
  return api.delete(`/films/${id}`);
};
