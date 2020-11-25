import React from 'react'
import { IMovies } from '../repositories/movies'

interface IMovieWrapper {
    movie: IMovies
}

const MovieWrapper: React.FC<IMovieWrapper> = ({ movie: { duracao, sinopse, titulo }}) => {
    return (
        <div id='movie-wrapper'>
            <div className='movie-image' />
            <main>
                <h1>{titulo}</h1>
                <p><strong>Sinopse: </strong>{sinopse}</p>
                <span><strong>Duração: </strong>{duracao}min</span>
            </main>
        </div>
    )
}

export default MovieWrapper