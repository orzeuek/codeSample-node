import * as chai from 'chai';
import { InMemoryMoviesRepository } from '../../../src/Movies/InMemoryMoviesRepository';

describe("Simple in memory movies storage", () => {

  it("should store Movie with incremented Id", async () => {
    const movie = {
      title: "",
      year: "",
      released: "",
      genre: "",
      actors: "",
      plot: "",
      language: "",
      country: "",
    };
    const repo = new InMemoryMoviesRepository();
    const result1 = await repo.add(movie);
    const result2 = await repo.add(movie);
    chai.expect(result1.id).to.be.equal(0);
    chai.expect(result2.id).to.be.equal(1);
  });

  it("should be able to get movie", async () => {
    const movie = {
      title: "",
      year: "",
      released: "",
      genre: "",
      actors: "",
      plot: "",
      language: "",
      country: "",
    };
    const repo = new InMemoryMoviesRepository();
    await repo.add(movie);
    await repo.add(movie);
    chai.expect(await repo.get(0)).to.deep.equal({...movie, id: 0});
    chai.expect(await repo.get(1)).to.deep.equal({...movie, id: 1});
  });

  it("should be able to generate all movies", async () => {
    const movie = {
      title: "",
      year: "",
      released: "",
      genre: "",
      actors: "",
      plot: "",
      language: "",
      country: "",
    };
    const repo = new InMemoryMoviesRepository();
    await repo.add(movie);
    await repo.add(movie);
    await repo.add(movie);

    let found = 0;
    for await (const movie of repo.generateAll()) {
      chai.expect(movie).to.deep.equal({...movie, id: found});
      found++;
    }
    chai.expect(found).to.equal(3);
  });

  it("should be able to get all movies", async () => {
    const movie = {
      title: "",
      year: "",
      released: "",
      genre: "",
      actors: "",
      plot: "",
      language: "",
      country: "",
    };
    const repo = new InMemoryMoviesRepository();
    await repo.add(movie);
    await repo.add(movie);
    await repo.add(movie);

    chai.expect((await repo.getAll()).length).to.be.equal(3);
  })
});
