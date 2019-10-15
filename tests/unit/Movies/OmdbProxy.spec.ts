import * as chai from 'chai';
import { OmdbProxy } from '../../../src/Movies/OmdbProxy';

describe('Proxy for OMDB API', () => {

  const OMDB_MATRIX_RESPONSE_BODY = {
    Title: 'Matrix',
    Year: '1993–',
    Rated: 'N/A',
    Released: '01 Mar 1993',
    Runtime: '60 min',
    Genre: 'Action, Drama, Fantasy, Thriller',
    Director: 'N/A',
    Writer: 'Grenville Case',
    Actors: 'Nick Mancuso, Phillip Jarrett, Carrie-Anne Moss, John Vernon',
    Plot: 'Steven Matrix is one of the underworld\'s foremost hitmen until his luck runs out, and someone puts a contract out on him. Shot in the forehead by a .22 pistol, Matrix \'dies\' and finds ...',
    Language: 'English',
    Country: 'Canada',
    Awards: '1 win.',
    Poster: 'https://m.media-amazon.com/images/M/MV5BYzUzOTA5ZTMtMTdlZS00MmQ5LWFmNjEtMjE5MTczN2RjNjE3XkEyXkFqcGdeQXVyNTc2ODIyMzY@._V1_SX300.jpg',
    Ratings: [
      {
        Source: 'Internet Movie Database',
        Value: '7.8/10'
      }
    ],
    Metascore: 'N/A',
    imdbRating: '7.8',
    imdbVotes: '125',
    imdbID: 'tt0106062',
    Type: 'series',
    totalSeasons: 'N/A',
    Response: 'True',
  };

  const OMDB_NOT_FOUND_RESPONSE_BODY = {
    Response: 'False',
    Error: 'Movie not found!'
  };

  it('should return proper object if there were no errors', async () => {
    const expected = {
      title: OMDB_MATRIX_RESPONSE_BODY.Title,
      year: OMDB_MATRIX_RESPONSE_BODY.Year,
      released: OMDB_MATRIX_RESPONSE_BODY.Released,
      genre: OMDB_MATRIX_RESPONSE_BODY.Genre,
      actors: OMDB_MATRIX_RESPONSE_BODY.Actors,
      plot: OMDB_MATRIX_RESPONSE_BODY.Plot,
      language: OMDB_MATRIX_RESPONSE_BODY.Language,
      country: OMDB_MATRIX_RESPONSE_BODY.Country,
    };
    const omdb = new OmdbProxy('', (options: object) => OMDB_MATRIX_RESPONSE_BODY);
    const result = await omdb.getByTitle('Matrix');
    chai.expect(result).to.deep.equal(expected);
  });

  it('should throw exception if movie was not found', async () => {
    const omdb = new OmdbProxy('', (options: object) => OMDB_NOT_FOUND_RESPONSE_BODY);
    
    try{
      await omdb.getByTitle('Matrix'); 
    } catch (e) {
      chai.expect(e.message).to.be.equal('Failed to load movie details. ' + OMDB_NOT_FOUND_RESPONSE_BODY.Error);
      return;
    }
    throw new Error('Error was expected but not caught.');
  })

});
