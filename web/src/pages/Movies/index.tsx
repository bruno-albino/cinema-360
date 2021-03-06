import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import MovieWrapper from '../../components/MoviesWrapper'
import Container from '../../components/Container'

import moviesRepository, { IMovies } from '../../repositories/movies'
import sessionsRepository from '../../repositories/sessions'

import './styles.css'

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<IMovies[]>([])
    const history = useHistory()

    useEffect(() => {
        moviesRepository
        .getAll()
        .then(setMovies)
        .catch(error => {
          if (error.response) {
            if(error.response.status === 401 || error.response.status === 403) {
              history.push(`login?next=/movies`)
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

  async function handleLogout(){
    await sessionsRepository.logout()
    history.push('')
  }

  function handleNavigateToMovie(id: string) {
    history.push(`movies/${id}`)
  }

  return (
    <Container id='movies-page'>
      <h1>Filmes</h1>
      <main>
        {movies.map(movie => <MovieWrapper onClick={handleNavigateToMovie} movie={movie}/>)}
      </main>
    </Container>
  )
}

export default Movies