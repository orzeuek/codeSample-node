import { Container } from './Service/Container';

const container = new Container();
container.Koa.listen(9000,() => {
  console.log('app started');
});
