import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './UpdateForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movies, setMovies] = useState([]);
  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };
  const updateMovies = (movie) => {
    console.log(movie)
    setMovies({ movies: [...movies, movie] })
  }
  return (
    <>

      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} updateList={addToSavedList} />;
        }}
      />


      <Route path='/update-movie/:id' render={props => {
        return <UpdateForm {...props} movies={movies} updateMovies={updateMovies} key={props.match.key} />
      }}
      />


    </>
  );
};

export default App;
