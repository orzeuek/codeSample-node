import { Controller } from '../Service/Controller';
import { IRouterContext } from 'koa-router';
import { MoviesRepository } from './MoviesRepository';

export class ReadMoviesController implements Controller {

  constructor(
    private readonly movieRepository: MoviesRepository
  ) {

  }


  public async handle(ctx: IRouterContext) {
    return await this.movieRepository.getAll();
  }

}
