import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router';
import MovieWrapper from '../../components/MoviesWrapper';
import Container from '../../components/Container';
import moviesRepository, { IMovies } from '../../repositories/movies';
import './styles.css'

interface MatchParams {
    id: string;
}

interface MovieRouteProps extends RouteComponentProps<MatchParams> {}

const Movie: React.FC<MovieRouteProps> = ({ match: { params: { id }}}) => {
    const [movie, setMovie] = useState<IMovies | null>(null)
    const history = useHistory()

    useEffect(() => {
        moviesRepository.show(id)
        .then(setMovie)
        .catch(console.error)
    }, [id])

    if(!movie) return <div>Loading</div>
    return (
        <Container id='movie-page' >
            <MovieWrapper movie={movie} onClick={() => {}} />
        </Container>
    )
}

export default Movie