import { useRef, useState, useEffect } from "react";
import Movie from "./Movie";
import { fetchData } from './fetch'

const Movies = ({ saveFavMovie, removeFavMovie, favoriteMovies }) => {
    const apiKey = "&api_key=53c258bb52d305146e19a71e58aa2cc5";
    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const inputRef = useRef();
    const selectRef = useRef();
    const [allGenres, setAllGenres] = useState();
    const urlPopularMovies = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
    const urlCategoryList = 'https://api.themoviedb.org/3/genre/movie/list?language=en-US';
    const urlQuery = 'https://api.themoviedb.org/3/search/movie?language=en-US&query=';

    // loads 10 most popular movies and all categories
    useEffect(() => {
        fetchData(urlPopularMovies, apiKey)
            .then(data => {
                setMovies(data.results.slice(0, 10));
                setIsLoading(false);
                setError(null)
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.message);
            })

        fetchData(urlCategoryList, apiKey)
            .then(data => {
                setAllGenres(data.genres);
                setIsLoading(false);
                setError(null)
            })
            .catch(e => {
                setIsLoading(false);
                setError(e.message);
            })
    }, []);

    // fetches movies depending on selected category
    const changeCategory = () => {
        if (selectRef.current.value !== "none") {
            fetchData(('https://api.themoviedb.org/3/discover/movie?language=en-US&with_genres=' + selectRef.current.value), apiKey)
                .then(data => {
                    setMovies(data.results);
                    setIsLoading(false);
                    setError(null)
                })
                .catch(e => {
                    setIsLoading(false);
                    setError(e.message);
                })
        } else {
            fetchData(urlPopularMovies, apiKey)
                .then(data => {
                    setMovies(data.results.slice(0, 10));
                    setIsLoading(false);
                    setError(null)
                })
                .catch(e => {
                    setIsLoading(false);
                    setError(e.message);
                })
        };
    };

    // movie search by query
    const fetchMovies = () => {
        if (selectRef.current.value !== "none" && inputRef.current.value.length > 1) {
            fetchData((urlQuery + inputRef.current.value), apiKey)
                .then(data => {
                    setMovies(data.results.filter(movie => movie.genre_ids.includes(parseInt(selectRef.current.value))))
                    setIsLoading(false);
                    setError(null)
                })
                .catch(e => {
                    setIsLoading(false);
                    setError(e.message);
                })
        } else if (inputRef.current.value.length > 1) {
            fetchData((urlQuery + inputRef.current.value), apiKey)
                .then(data => {
                    setMovies(data.results)
                    setIsLoading(false);
                    setError(null)
                })
                .catch(e => {
                    setIsLoading(false);
                    setError(e.message);
                })
        }
        inputRef.current.value = "";
    };

    return (
        <>
            {isLoading && <div className="load-error"><h3>Loading...</h3></div>}
            {error && <div className="load-error"><h3>{error}</h3></div>}
            {allGenres && movies &&
                <>
                    <div className="search-bar">
                        <select name="category" id="category" ref={selectRef}>
                            <option value="none" onClick={changeCategory}>No category:</option>
                            {allGenres.map(genre => (
                                <option key={genre.id} value={genre.id} onClick={changeCategory}>{genre.name}</option>
                            ))
                            }
                        </select>
                        <input type="text" placeholder="Movie title" ref={inputRef} />
                        <button onClick={fetchMovies}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"></path></svg></button>
                    </div>
                    <div className="movie-grid">
                        <Movie moviesData={movies} saveFavMovie={saveFavMovie} removeFavMovie={removeFavMovie} favoriteMovies={favoriteMovies} />
                    </div>
                </>
            }
        </>
    );
};

export default Movies;