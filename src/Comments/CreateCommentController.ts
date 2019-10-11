import { Controller } from '../Service/Controller';
import { IRouterContext } from 'koa-router';
import { MoviesRepository } from '../Movies/MoviesRepository';
import { CommentsRepository } from './CommentsRepository';

type CreateMoviesRequest = string[];

export class CreateCommentController implements Controller {

  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly commentsRepository: CommentsRepository,
  ){}

  public async handle(ctx: IRouterContext) {
    this.validateRequest(ctx);

    const movieId = ctx.params.id;
    const content = ctx.request.body.content;

    const movie = await this.moviesRepository.get(movieId);
    const persistedComment = await this.commentsRepository.add({movie, content: content});

    return ['/comments/'+persistedComment.id];
  }

  private validateRequest(ctx: IRouterContext): void {
    if (isNaN(ctx.params.id)) {
      throw new Error('Movie id has to be number!');
    }

    if(! ('content' in ctx.request.body)) {
      throw new Error('Request do not contain "content" property.');
    }
  }
}
