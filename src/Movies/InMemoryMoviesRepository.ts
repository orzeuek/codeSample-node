import { MoviesRepository } from './MoviesRepository';
import { PersistedMovie } from './Movie';
import { Movie } from './Movie';
import { GenericInMemoryStorage } from '../Storage/GenericInMemoryStorage';


export class InMemoryMoviesRepository implements MoviesRepository {

  private readonly storage: GenericInMemoryStorage<Movie, PersistedMovie>;

  constructor() {
    this.storage = new GenericInMemoryStorage<Movie, PersistedMovie>();
  }

  public async add(movie: Movie): Promise<PersistedMovie> {
    return await this.storage.add(movie, (movie: Movie, id: number) => {return {...movie, id}})
  }

  public async get(id: number): Promise<PersistedMovie> {
    return await this.storage.get(id);
  }

  public async getAll(): Promise<PersistedMovie[]> {
    return await this.storage.getAll();
  }

  /**
   * use generator in case of super large movies repo.
   */
  public async *generateAll (): AsyncGenerator<PersistedMovie> {
    for(const id of this.storage.getKeys()) {
      yield await this.get(id);
    }
  }

}
