import { MoviesRepository } from './MoviesRepository';
import { PersistedMovie } from './PersistedMovie';
import { Movie } from './Movie';

type IndexedMovieStorage = PersistedMovie[];

export class InMemoryMoviesRepository implements MoviesRepository {

  private storage: IndexedMovieStorage = [];
  private lastId: number = 0;

  public async add(movie: Movie): Promise<PersistedMovie> {
    const id = this.lastId++;
    const storedMovie = {...movie, id: id};
    this.storage[id] = storedMovie;

    return storedMovie
  }

  public async get(id: number): Promise<PersistedMovie> {
    if (!(id in this.storage)) {
      throw new Error('Movie with id ' + id + ' not found!')
    }
    return this.storage[id];
  }

  /**
   * use generator in case of super large movies repo.
   */
  public async *generateAll (): AsyncGenerator<PersistedMovie> {
    for(const id of this.storage.keys()) {
      yield await this.get(id);
    }
  }

  public async getAll(): Promise<PersistedMovie[]> {
    return this.storage;
  }

}
