import { HttpClient } from '../Http/HttpClient';

export type OmdbResponse = {
  title: string,
  year: string,
  released: string,
  genre: string,
  actors: string,
  plot: string,
  language: string,
  country: string,
}

export class OmdbProxy {

  constructor(
    private readonly apiKEy: string,
    private readonly httpClient: HttpClient
  ) {

  }

  public async getByTitle(title: string): Promise<OmdbResponse> {
    const response = await this.httpClient({
      uri: 'http://www.omdbapi.com/',
      qs: {
        apikey: this.apiKEy,
        t: title
      },
      json: true
    });

    if (response.Error) {
      throw new Error('Failed to load movie details. ' + response.Error);
    }

    return {
      title: response.Title,
      year: response.Year,
      released: response.Released,
      genre: response.Genre,
      actors: response.Actors,
      plot: response.Plot,
      language: response.Language,
      country: response.Country,
    }

  }
}
