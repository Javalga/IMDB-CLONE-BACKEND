export default class MoviesController {
  constructor(moviesService) {
    this.moviesService = moviesService;
  }

  async getNowPlayingMovies(request, reply) {
    try {
      const page = request.query.page || 1;
      const movies = await this.moviesService.getNowPlayingMovies(page);
      reply.send(movies);
    } catch (err) {
      reply.internalServerError("Failed to fetch now playing movies.");
    }
  }

  async getPopularMovies(request, reply) {
    try {
      const page = request.query.page || 1;
      const movies = await this.moviesService.getPopularMovies(page);
      reply.send(movies);
    } catch (err) {
      console.log(err);
      reply.internalServerError("Failed to fetch popular movies.");
    }
  }

  async getMovieCredits(request, reply) {
    try {
      const credits = await this.moviesService.getMovieCredits(
        request.params.movie_id
      );
      reply.send(credits);
    } catch (err) {
      reply.internalServerError("Failed to fetch movie credits.");
    }
  }
}
