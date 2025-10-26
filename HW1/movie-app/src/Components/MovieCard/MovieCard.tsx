import type { Movie } from '../../types'
import { useState } from "react";
import "./MovieCard.css";

type Props = {
    movie: Movie;
    onToggleFavorite: (id: string) => void;
    view: "grid" | "list";
};

export const MovieCard = ({ movie, onToggleFavorite, view }: Props) => {
    const [isAnimating, setIsAnimating] = useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        onToggleFavorite(movie.id);
        setTimeout(() => setIsAnimating(false), 300);
    };

    return (
        <article className={`movie-card ${view === "list" ? "list" : "grid"} ${isAnimating ? "animate" : ""}`}>
            <img src={movie.posterUrl} alt={movie.title} />
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
            </div>
            <button
                aria-label={movie.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                className={`favorite-btn ${movie.isFavorite ? "active" : ""}`}
                onClick={handleClick}
            >
                ★
            </button>
        </article>
    );
};

export default MovieCard;
