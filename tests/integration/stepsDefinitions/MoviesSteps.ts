import { after, binding, given, then, when, before } from 'cucumber-tsflow';
import { Container } from '../../../src/Service/Container';
import * as supertest from 'supertest';
import * as chai from 'chai';

@binding()
export class MoviesSteps {

  private app;
  private lastRequest;

  @before()
  public startApp(): void {
    this.app = (new Container).Koa.listen(9001);
  }

  @after()
  public closeApp(): void {
    this.app.close();
  }

  @when('GET request has been sent to {string}')
  public async sendGetRequest(url: string): Promise<void> {
    this.lastRequest = supertest(this.app).get(url);
  }

  @when('POST request with {string} content has been sent to {string}')
  public sendPostRequest(contentBodyFile: string, url: string) {
    const body = require(__dirname + '/../requests/' + contentBodyFile);
    this.lastRequest = supertest(this.app).post(url).send(body).set('content-type', 'application/json');
  };

  @then('List of {int} movies should be returned')
  public async assertListOfMovies(expectedAmount: number): Promise<void> {
    await this.lastRequest
              .expect(200)
              .then(response => {
                if (response.body.length !== expectedAmount) {
                  throw new Error('Expected ' + expectedAmount + 'movies, ' + response.body.length + ' received!');
                }
                const expectedKeys = ['title', 'year', 'released', 'genre', 'actors', 'plot', 'language', 'country', 'id'];
                for (const element of response.body) {
                  chai
                    .expect(Object.keys(element), "Missing property in movie object!")
                    .to.deep.equal(expectedKeys);
                }
              });
  }

  @then('I should receive movie identifiers')
  public async assertMovieIdentifiers(): Promise<void> {
    await this.lastRequest
              .expect(200)
              .then(response => {
                if (response.body.length === 0) {
                  throw new Error('No movies identifiers found!');
                }
                for (const element of response.body) {
                  chai
                    .expect(element)
                    .to.match(/\/movie\/(\d)+/);
                }
              });
  }

  @then('Movie object should be returned')
  public async assertMoviesObject(): Promise<void> {
    await this.lastRequest
              .expect(200)
              .then(response => {
                const expectedKeys = ['title', 'year', 'released', 'genre', 'actors', 'plot', 'language', 'country', 'id'];
                chai
                  .expect(Object.keys(response.body), "Missing property in movie object!")
                  .to.deep.equal(expectedKeys);
              });
  }

}
