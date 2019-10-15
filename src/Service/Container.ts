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
import { CreateCommentController } from '../Comments/CreateCommentController';
import { CommentsRepository } from '../Comments/CommentsRepository';
import { InMemoryCommentsRepository } from '../Comments/InMemoryCommentsRepository';
import { Controller } from './Controller';
import { ReadCommentController } from '../Comments/ReadCommentController';
import { ReadCommentsForMovieController } from '../Comments/ReadCommentsForMovieController';
import { ReadCommentsController } from '../Comments/ReadCommentsController';

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
    router.get('/movies/:id', this.wrapKoaController(this.readMovieController()));
    router.get('/movies', this.wrapKoaController(this.readMoviesController()));
    router.post('/movies', this.wrapKoaController(this.createMoviesController()));

    router.post('/movies/:id/comments', this.wrapKoaController(this.createCommentController()));
    router.get('/comments/:id', this.wrapKoaController(this.readCommentController()));
    router.get('/comments', this.wrapKoaController(this.readCommentsController()));
    router.get('/movies/:id/comments', this.wrapKoaController(this.readCommentsForMovieController()));
    return router;
  }

  private wrapKoaController(controller: Controller) {
    return async (ctx, next): Promise<void> => {
      try {
        ctx.body = await controller.handle(ctx);
        next();
      } catch (e) {
        ctx.body = {message: e.message};
        ctx.status = e.status || 500;
      }
    };
  }

  @memoize
  public readMovieController(): ReadMovieController {
    return new ReadMovieController(
      this.moviesRepository()
    )
  }

  @memoize
  public readMoviesController(): ReadMoviesController {
    return new ReadMoviesController(
      this.moviesRepository()
    )
  }

  @memoize
  public createMoviesController(): CreateMoviesController {
    return new CreateMoviesController(
      this.moviesRepository(),
      this.omdbProxy()
    );
  }

  @memoize
  public createCommentController(): CreateCommentController {
    return new CreateCommentController(
      this.moviesRepository(),
      this.commentsRepository(),
    );
  }

  @memoize
  public readCommentController(): ReadCommentController {
    return new ReadCommentController(
      this.commentsRepository(),
    );
  }

  @memoize
  public readCommentsController(): ReadCommentsController {
    return new ReadCommentsController(
      this.commentsRepository(),
    );
  }

  @memoize
  public readCommentsForMovieController(): ReadCommentsForMovieController {
    return new ReadCommentsForMovieController(
      this.commentsRepository(),
    );
  }

  @memoize
  public moviesRepository(): MoviesRepository {
    return new InMemoryMoviesRepository();
  }

  @memoize
  public commentsRepository(): CommentsRepository {
    return new InMemoryCommentsRepository();
  }

  @memoize
  public omdbProxy(): OmdbProxy {
    return new OmdbProxy(this.omdbApiKey, request);
  }

  public get omdbApiKey(): string {
    return '7631f709';
  }

}
