import React, { useEffect, useState } from "react";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import "../App.css";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=70d1c4fa";

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=70d1c4fa`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="MOVIE JUNCTION" />
      <Search search={search} />

      {loading && !errorMessage ? (
        <h3 className="loading">loading...</h3>
      ) : errorMessage ? (
        <h3 className="loading">{errorMessage}</h3>
      ) : (
        <div className="movie-div">
          {movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
