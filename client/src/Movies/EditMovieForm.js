import React, { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from 'axios'

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
}

function EditMovieForm(props) {
const {movieList, setMovieList} = props;
  const params = useParams();
  const [movie, setMovie] = useState(null);
  const [update, setUpdate] = useState(initialMovie);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const changeHandler = (e) => {
    setUpdate(([e.target.name] = e.target.value));
  };

  const submitMovie = (e) => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
    .then(res => {
        const newMovieArr = props.movieList.filter(movie => movie.id !== params.id);
        newMovieArr.push(res.data);
        props.setMovieList(newMovieArr);
    })
    .catch(err => console.log(err))
  };

  return (
    <Form onSubmit={submitMovie} style = {{width: '80%'}}>
      <FormGroup>
        <Label for="title" hidden>
          Title:
        </Label>
        <Input
          onChange={changeHandler}
          type="text"
          name="title"
          id="title"
          value={update.title}
          placeholder={movie.title}
        />
      </FormGroup>
      <FormGroup>
        <Label for="director" hidden>
          Director:
        </Label>
        <Input
          onChange={changeHandler}
          type="text"
          name="director"
          id="director"
          value={update.director}
          placeholder={movie.director}
        />
      </FormGroup>
      <FormGroup>
        <Label for="metascore" hidden>
          Metascore:
        </Label>
        <Input
          onChange={changeHandler}
          type="text"
          name="metascore"
          id="metascore"
          value={update.metascore}
          placeholder={movie.metascore}
        />
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
}

export default EditMovieForm;
