import { NotFoundError } from '../Http/NotFoundError';

export class GenericInMemoryStorage<InputClass, PersistedClass> {

  private storage: PersistedClass[] = [];
  private lastId: number = 0;

  public async add(input: InputClass, storedFactory: (input: InputClass, id: number) => PersistedClass): Promise<PersistedClass> {
    const id = this.lastId++;
    const stored = storedFactory(input, id);
    this.storage[id] = stored;

    return stored
  }

  public async get(id: number): Promise<PersistedClass> {
    if (!(id in this.storage)) {
      throw new NotFoundError('Movie with id ' + id + ' not found!')
    }
    return this.storage[id];
  }

  public getKeys(): Iterable<number> {
    return this.storage.keys();
  }

  public async getAll(): Promise<PersistedClass[]> {
    return this.storage;
  }
}
