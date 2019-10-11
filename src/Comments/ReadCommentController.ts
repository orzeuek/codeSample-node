import { Controller } from '../Service/Controller';
import { IRouterContext } from 'koa-router';
import { CommentsRepository } from './CommentsRepository';

export class ReadCommentController implements Controller {

  constructor(
    private readonly commentsRepository: CommentsRepository,
  ) {
  }

  public async handle(ctx: IRouterContext) {
    return await this.commentsRepository.get(ctx.params.id);
  }

}
