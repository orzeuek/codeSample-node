import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import * as KoaBodyParser from 'koa-bodyparser'
import { memoize } from 'lodash-decorators';
import { CreateMoviesController } from '../Movies/CreateMoviesController';
import { ReadMovieController } from '../Movies/ReadMovieController';
import { MoviesRepository } from '../Movies/MoviesRepository';
import { OmdbProxy } from '../Movies/OmdbProxy';
import { InMemoryMoviesRepository } from '../Movies/InMemoryMoviesRepository';
import * as request from 'request-promise-native';
import { ReadMoviesController } from '../Movies/ReadMoviesController';

export class Container {

  public get Koa(): Koa {
    const koa = new Koa();
    koa
      .use(KoaBodyParser())
      .use(this.router.routes())
      .use(this.router.allowedMethods());
    return koa;
  };

  @memoize
  public get router(): KoaRouter {
    const router = new KoaRouter();
    router.get('/movie/:id', async (ctx, next) => {
      ctx.body = await (new ReadMovieController(
        this.moviesRepository()
      )).handle(ctx);
      next();
    });
    router.get('/movies', async (ctx, next) => {
      ctx.body = await (new ReadMoviesController(
        this.moviesRepository()
      )).handle(ctx);
      next();
    });
    router.post('/movies', async (ctx, next) => {
      ctx.body = await (new CreateMoviesController(
        this.moviesRepository(),
        this.omdbProxy(),
      ).handle(ctx));
      next();
    });
    return router;
  }

  @memoize
  public moviesRepository(): MoviesRepository {
    return new InMemoryMoviesRepository();
  }

  @memoize
  public omdbProxy(): OmdbProxy {
    return new OmdbProxy(this.omdbApiKey, request);
  }

  public get omdbApiKey(): string {
    return '7631f709';
  }

}
