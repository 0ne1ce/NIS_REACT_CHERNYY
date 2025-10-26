import React from 'react'
import type { Movie, ViewMode } from '../types'
import MovieCard from './MovieCard/MovieCard.tsx'

type Props = {
    movies: Movie[]
    onToggleFavorite: (id: string) => void
    view: ViewMode
}

const MovieList: React.FC<Props> = ({ movies, onToggleFavorite, view }) => {
    if(movies.length === 0) return <div className="empty">Фильмов нет</div>

    return (
        <section className={view === 'grid' ? 'movie-grid' : 'movie-list'} aria-live="polite">
            {movies.map(m => (
                <MovieCard key={m.id} movie={m} onToggleFavorite={onToggleFavorite} view={view} />
            ))}
        </section>
    )
}

export default MovieList