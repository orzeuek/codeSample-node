export type MovieTitle = string;

export interface Movie {
  title: MovieTitle,
  year: string,
  released: string,
  genre: string,
  actors: string,
  plot: string,
  language: string,
  country: string,
}

export interface PersistedMovie extends Movie {
  id: number
}
