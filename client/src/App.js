import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";

import EditMovieForm from "./Movies/EditMovieForm";
import AddMovieForm from "./Movies/AddMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };
  getMovieList();

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Route path="/update-movie/:id">
          <EditMovieForm />
        </Route>
        <Route path="/add-movie">
          <AddMovieForm movieList={movieList} setMovieList={setMovieList} />
        </Route>
      </div>
    </>
  );
};

export default App;
