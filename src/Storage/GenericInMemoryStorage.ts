import { NotFoundError } from '../Http/NotFoundError';

/**
 * Storage.add() and .get() are quite common. If there is nothing special
 * in your class, feel free to use this abstraction.
 * `InputClass` - class which you will pass to add() as a first argument
 * `PersistedClass` - class which will be persisted.
 */
export class GenericInMemoryStorage<InputClass, PersistedClass> {

  private storage: PersistedClass[] = [];
  private lastId: number = 0;

  /**
   *
   * @param input
   * @param storedFactory
   * some sort of transformer which will be convert InputClass into PersistedClass. Feel free to
   * use given id in your PersistedClass object.
   */
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
