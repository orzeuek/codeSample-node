import {IRouterContext} from 'koa-router';

export interface Controller {

  handle(ctx: IRouterContext);
}
