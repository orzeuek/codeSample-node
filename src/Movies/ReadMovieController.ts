import { Controller } from '../Service/Controller';
import { IRouterContext } from 'koa-router';
import { MoviesRepository } from './MoviesRepository';

export class ReadMovieController implements Controller {

  constructor(
    private readonly movieRepository: MoviesRepository
  ) {

  }


  public async handle(ctx: IRouterContext) {
    const id = ctx.params.id;

    return await this.movieRepository.get(id);
  }

}
