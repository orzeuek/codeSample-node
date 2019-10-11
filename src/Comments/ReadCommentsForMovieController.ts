import { Controller } from '../Service/Controller';
import { IRouterContext } from 'koa-router';
import { CommentsRepository } from './CommentsRepository';
import { PersistedComment } from './Comment';

export class ReadCommentsForMovieController implements Controller {

  constructor(
    private readonly commentsRepository: CommentsRepository,
  ) {
  }

  public async handle(ctx: IRouterContext) {
    this.validateRequest(ctx);

    const movieId = parseInt(ctx.params.id, 10);
    return (await this.commentsRepository.getAll())
      .filter((comment: PersistedComment) => comment.movie.id === movieId);
  }

  private validateRequest(ctx: IRouterContext): void {
    if (isNaN(ctx.params.id)) {
      throw new Error('Movie id has to be number!');
    }
  }

}
