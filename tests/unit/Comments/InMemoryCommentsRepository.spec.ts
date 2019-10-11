import * as chai from 'chai';
import { InMemoryCommentsRepository } from '../../../src/Comments/InMemoryCommentsRepository';

describe("Simple in memory comments storage", () => {

  const movie = {
    title: "",
    year: "",
    released: "",
    genre: "",
    actors: "",
    plot: "",
    language: "",
    country: "",
    id: 1,
  };

  it("should store Comments with incremented Id", async () => {
    const comment = {movie, content: ''};
    const repo = new InMemoryCommentsRepository();
    const result1 = await repo.add(comment);
    const result2 = await repo.add(comment);
    chai.expect(result1.id).to.be.equal(0);
    chai.expect(result2.id).to.be.equal(1);
  });

  it("should be able to get comment", async () => {
    const comment = {movie, content: ''};
    const repo = new InMemoryCommentsRepository();
    await repo.add(comment);
    await repo.add(comment);
    chai.expect(await repo.get(0)).to.deep.equal({...comment, id: 0});
    chai.expect(await repo.get(1)).to.deep.equal({...comment, id: 1});
  });

  it("should be able to get all comments", async () => {
    const comment = {movie, content: ''};
    const repo = new InMemoryCommentsRepository();
    await repo.add(comment);
    await repo.add(comment);
    await repo.add(comment);

    chai.expect((await repo.getAll()).length).to.be.equal(3);
  })
});
