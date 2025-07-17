export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }
  
  export interface Film {
    id: number;
    title: string;
    description: string;
    poster: string;
    views: number;
  }
  
  export interface WatchLog {
    id: number;
    userId: number;
    filmId: number;
    watchedAt: string;
    film: Film;
  }
  