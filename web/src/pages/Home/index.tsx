import React from 'react'
import { useHistory } from 'react-router-dom'
import Container from '../../components/Container'
import './styles.css'

const Home: React.FC = () => {
    const history = useHistory()

    function handleNavigateToMovies() {
        history.push('movies')
    }

    function handleNavigateToMoviesPremieres() {
        history.push('premieres')
    }

    function handleNavigateToCities() {
        history.push('cities')
    }

    return (
        <Container id='home-page'>
            <button className='black-button buttons' onClick={handleNavigateToMovies}>Filmes</button>
            <button className='black-button buttons' onClick={handleNavigateToMoviesPremieres}>Filmes Lançamentos</button>
            <button className='black-button buttons' onClick={handleNavigateToCities}>Cidades</button>
            
        </Container>
    )
}

export default Home