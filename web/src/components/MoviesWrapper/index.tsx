import React from 'react'
import { IMovies } from '../../repositories/movies'

import './styles.css'

interface IMovieWrapper {
    movie: IMovies,
    onClick: (id: string) => void
}

const MovieWrapper: React.FC<IMovieWrapper> = ({ onClick, movie: { _id, duracao, sinopse, titulo }}) => {
    return (
        <div id='movie-wrapper'>
            <div className='movie-image' />
            <main onClick={() => onClick(_id)}>
                <h1>{titulo}</h1>
                <p><strong>Sinopse: </strong>{sinopse}</p>
                <span><strong>Duração: </strong>{duracao}min</span>
            </main>
        </div>
    )
}

export default MovieWrapper