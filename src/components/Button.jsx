import { useState } from "react";

const Button = ({ movie, saveFavMovie, removeFavMovie, isFavorite }) => {

    const [favorite, setFAvorite] = useState(isFavorite);

    // changes the icon of a favorite movie
    const favoriteToggle = () => {
        favorite ? removeFavMovie(movie.id) : saveFavMovie(movie.id, movie.title, movie.poster_path);
        setFAvorite(!favorite);
    };

    return (
        <button className='watchlist' onClick={favoriteToggle}>
            <i className={favorite ? "bi bi-heart-fill" : "bi bi-heart"}></i>
        </button>
    );
};

export default Button;