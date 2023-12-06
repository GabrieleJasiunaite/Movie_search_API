import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { fetchData } from "./fetch";

const Movie = ({ moviesData, saveFavMovie, removeFavMovie, favoriteMovies }) => {

    const imgString = 'https://image.tmdb.org/t/p/w500';
    const apiKey = '&api_key=53c258bb52d305146e19a71e58aa2cc5';
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetches more details of the movie
    const getDetails = (id) => {
        fetchData(('https://api.themoviedb.org/3/movie/' + id + '?language=en=US'), apiKey)
            .then(data => {
                setMovieDetails({ ...data, genres: [...data.genres] });
                setIsLoading(false);
                setError(null);
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.message);
            })

        movieDetails !== null ? document.body.classList.add('active-modal') : document.body.classList.remove('active-modal');
    }

    return (
        <>
            {moviesData.map(movie => (
                <div className="movie" key={movie.id}>
                    <Button movie={movie} saveFavMovie={saveFavMovie} removeFavMovie={removeFavMovie} isFavorite={favoriteMovies.some(film => film.id === movie.id)} />
                    <img src={imgString + movie.poster_path} alt={movie.original_title} />
                    <h3>{movie.original_title} ({movie.release_date.slice(0, 4)})</h3>
                    <button onClick={() => getDetails(movie.id)}>Details</button>
                </div>
            ))
            }
            {movieDetails && (
                <Modal movieDetails={movieDetails} toggleModal={() => setMovieDetails(null)} isLoading={isLoading} error={error} />
            )}
        </>
    );
};

export default Movie;