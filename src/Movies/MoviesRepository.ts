import { Movie } from './Movie';
import { PersistedMovie } from './Movie';

export interface MoviesRepository {

  add(movie: Movie): Promise<PersistedMovie>;
  get(id: number): Promise<PersistedMovie>;
  generateAll(): AsyncGenerator<PersistedMovie>;
  getAll(): Promise<PersistedMovie[]>;
}
