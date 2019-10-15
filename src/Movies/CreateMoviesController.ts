import { Controller } from '../Service/Controller';
import { IRouterContext } from 'koa-router';
import { MoviesRepository } from './MoviesRepository';
import { OmdbProxy } from './OmdbProxy';

type CreateMoviesRequest = string[];

export class CreateMoviesController implements Controller {

  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly omdb: OmdbProxy,
  ){}

  public async handle(ctx: IRouterContext) {
    const requestBody = ctx.request.body as CreateMoviesRequest;
    this.validateRequest(requestBody);

    const movies = await Promise.all(
      requestBody.map( t => this.omdb.getByTitle(t))
    );

    const persistedMovies = await Promise.all(
      movies.map(movie => this.moviesRepository.add(movie))
    );

    return persistedMovies.map(movie => '/movies/' + movie.id);
  }

  /**
   * @param request
   */
  private validateRequest(request: CreateMoviesRequest): void {
    if(request.some(movie => typeof(movie) !== 'string')){
      throw new Error('Movie name has to be string!');
    }
  }

}
