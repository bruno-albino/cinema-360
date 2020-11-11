import MovieWrapper from '../components/MovieWrapper'
import moviesRepository from '../repositories/Movies'

function Movies({ movies }) {
    return (
      <div id='movies-page'>
        <h1>Filmes</h1>

        <main>
          {movies.map(movie => <MovieWrapper movie={movie}/>)}
        </main>
      </div>
    )
  }
  
  export async function getStaticProps() {
    const movies = await moviesRepository.getAll()

    return {
      props: {
        movies
      },
    }
  }


  export default Movies
  