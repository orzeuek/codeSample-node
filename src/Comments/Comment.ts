import { PersistedMovie } from '../Movies/Movie';

export interface Comment {
  movie: PersistedMovie,
  content: string,
}

export interface PersistedComment extends Comment{
  id: number
}
