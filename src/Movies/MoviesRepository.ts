import { Movie } from './Movie';
import { PersistedMovie } from './PersistedMovie';

export interface MoviesRepository {

  add(movie: Movie): Promise<PersistedMovie>;
  get(id: number): Promise<PersistedMovie>;
  generateAll(): AsyncGenerator<PersistedMovie>;
  getAll(): Promise<PersistedMovie[]>;
}
