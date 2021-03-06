import { after, binding, then, when, before } from 'cucumber-tsflow';
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
                    .to.match(/\/movies\/(\d)+/);
                }
              });
  }

  @then('I should receive comment identifier')
  public async assertCommentIdentifiers(): Promise<void> {
    await this.lastRequest
              .expect(200)
              .then(response => {
                if (response.body.length !== 1) {
                  throw new Error('No comment identifier found!');
                }
                for (const element of response.body) {
                  chai
                    .expect(element)
                    .to.match(/\/comments\/(\d)+/);
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
                  .expect(Object.keys(response.body), 'Missing property in movie object!')
                  .to.deep.equal(expectedKeys);
              });
  }

  @then('Comment object should be returned')
  public async assertCommentObject(): Promise<void> {
    await this.lastRequest
              .expect(200)
              .then(response => {
                const expectedKeys = ['movie', 'content', 'id'];
                chai
                  .expect(Object.keys(response.body), 'Missing property in movie object!')
                  .to.deep.equal(expectedKeys);
              });
  }

  @then('Object with id {int} should not be found')
  public async assertNotFound(id: number): Promise<void> {
    await this.lastRequest
        .expect(404)
        .then(response => {
          chai.expect(response.body.message).to.be.equal(`Movie with id ${id} not found!`);
        });
  }

  @then('Comments list with {int} elements should be returned')
  public async assertCommentsForMovies(expectedAmount: number): Promise<void> {
    await this.lastRequest
              .expect(200)
              .then(response => {
                if (response.body.length !== expectedAmount) {
                  throw new Error(`Expected ${expectedAmount} comments, but ${response.body.length} received!`);
                }
                for (const element of response.body) {
                  const expectedKeys = ['movie', 'content', 'id'];
                  chai
                    .expect(Object.keys(element))
                    .to.deep.equal(expectedKeys);
                }
              });
  }
}
