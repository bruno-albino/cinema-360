import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Container from '../../components/Container'
import MovieWrapper from '../../components/MoviesWrapper'
import moviesRepository, { IMovies } from '../../repositories/movies'
import sessionsRepository from '../../repositories/sessions'

const Premieres: React.FC = () => {
  const [premieres, setPremieres] = useState<IMovies[]>([])
  const history = useHistory()

  useEffect(() => {
    moviesRepository
      .getAllPremieres()
      .then(setPremieres)
      .catch(error => {
        console.log('caiu aqui')
        if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
            history.push('/login?next=/premieres')
            localStorage.clear()
          }
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
  }, [])

  function handleNavigateToMovie(id: string) {
    history.push(`movies/${id}`)
  }

  return (
    <Container id='movies-page'>
<     h1>Estreias de Filmes </h1>
      <main>
        {premieres.map(movie => <MovieWrapper onClick={handleNavigateToMovie} movie={movie} />)}
      </main>
    </Container>
  )
}

export default Premieres