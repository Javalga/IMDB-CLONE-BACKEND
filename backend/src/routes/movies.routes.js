import MoviesController from '../controllers/movies.controller.js'
import MoviesService from '../services/movies.service.js'
import authMiddleware from '../middlewares/auth.middleware.js'

export default async function (fastify) {
  const moviesService = new MoviesService(fastify)
  const moviesController = new MoviesController(moviesService)

  fastify.get('/movies/now-playing', {
    preHandler: authMiddleware,
    handler: moviesController.getNowPlayingMovies.bind(moviesController)
  })

  fastify.get('/movies/popular', {
    preHandler: authMiddleware,
    handler: moviesController.getPopularMovies.bind(moviesController)
  })

  fastify.get('/movies/:movie_id/credits', {
    preHandler: authMiddleware,
    handler: moviesController.getMovieCredits.bind(moviesController)
  })
}