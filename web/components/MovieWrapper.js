
function MovieWrapper({ movie }) {
    return (
        <div id='movie-wrapper'>
            <div className='movie-image' />
            <main>
                <h1>{movie.titulo}</h1>
                <p><strong>Sinopse: </strong>{movie.sinopse}</p>
                <span><strong>Duração: </strong>{movie.duracao}min</span>
            </main>
        </div>
    )
}

export default MovieWrapper