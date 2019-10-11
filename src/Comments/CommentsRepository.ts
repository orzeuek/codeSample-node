import { Comment, PersistedComment } from './Comment';

export interface CommentsRepository {

  add(comment: Comment): Promise<PersistedComment>;
  get(id:number): Promise<PersistedComment>;
  getAll(): Promise<PersistedComment[]>;

}
