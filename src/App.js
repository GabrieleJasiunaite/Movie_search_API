import './App.css';
import Nav from "./components/Nav";
import Movies from './components/Movies';
import { useState, useEffect } from 'react';

function App() {

  const imgString = 'https://image.tmdb.org/t/p/w500';
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // retrieves favorite movies from local storage
  useEffect(() => {
    const json = localStorage.getItem('favoriteMovies');
    if (!json) {
      return;
    };
    const movies = JSON.parse(json);
    if (movies) {
      setFavoriteMovies(movies);
      console.log(movies)
    };
  }, []);

  // saves favorite movies into an array, sets them to local storage
  const saveFavMovie = (id, title, path) => {
    const favMovies = [...favoriteMovies, { id: id, title: title, src: imgString + path }];
    setFavoriteMovies(favMovies);
    localStorage.setItem('favoriteMovies', JSON.stringify(favMovies));
  }

  // removes favorite movies from the array and local storage
  const removeFavMovie = (id) => {
    const filtered = favoriteMovies.filter(movie => movie.id !== id);
    setFavoriteMovies(filtered);
    localStorage.setItem('favoriteMovies', JSON.stringify(filtered));
  }

  return (
    <div className="App">
      <Nav favorites={favoriteMovies} />
      <Movies saveFavMovie={saveFavMovie} removeFavMovie={removeFavMovie} favoriteMovies={favoriteMovies} />
      <a className="top" href="#root"><i className='bi bi-arrow-up-circle'></i></a>
    </div>
  );
};

export default App;

