import { Comment, PersistedComment } from './Comment';
import { CommentsRepository } from './CommentsRepository';
import { GenericInMemoryStorage } from '../Storage/GenericInMemoryStorage';

export class InMemoryCommentsRepository implements CommentsRepository{

  private readonly storage: GenericInMemoryStorage<Comment, PersistedComment>;

  constructor() {
    this.storage = new GenericInMemoryStorage<Comment, PersistedComment>();
  }

  public async add(comment: Comment): Promise<PersistedComment> {
    return this.storage.add(comment, (comment: Comment, id: number) => {return {...comment, id}})
  }

  public async get(id: number): Promise<PersistedComment> {
    return await this.storage.get(id);
  }

  public async getAll(): Promise<PersistedComment[]> {
    return await this.storage.getAll();
  }

}
