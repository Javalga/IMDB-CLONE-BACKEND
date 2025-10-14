export default class MoviesService {
  constructor(fastify) {
    this.fastify = fastify;
    this.baseUrl = process.env.THEMOVIEDB_BASE_URL;
    this.apiKey = process.env.THEMOVIEDB_API_KEY;
    this.fetchOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };
  }
  async getNowPlayingMovies(page = 1) {
    try {
      const url = `${this.baseUrl}/now_playing?language=en-US&page=${page}`;
      const response = await fetch(url, this.fetchOptions);

      if (!response.ok) throw new Error("Failed to fetch now playing movies");

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error in getNowPlayingMovies: ${error.message}`);
    }
  }

  async getPopularMovies(page = 1) {
    try {
      const url = `${this.baseUrl}/popular?language=en-US&page=${page}`;
      const response = await fetch(url, this.fetchOptions);

      if (!response.ok) throw new Error("Failed to fetch popular movies");

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error in getPopularMovies: ${error.message}`);
    }
  }

  async getMovieCredits(movieId) {
    try {
      const url = `${this.baseUrl}/${movieId}/credits?language=en-US`;
      const response = await fetch(url, this.fetchOptions);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error in getMovieCredits: ${error.message}`);
    }
  }
}
