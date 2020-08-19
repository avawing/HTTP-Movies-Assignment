import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { v4 as uuid } from "uuid";

function AddMovieForm(props) {
  const { setMovieList } = props;
  const history = useHistory();
  const initialForm = {
    id: uuid(),
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  };

  const [movie, setMovie] = useState(initialForm);

  const changeHandler = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const submitMovie = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/movies', movie)
      .then(res => {
          setMovieList(res.data)
          history.push('/')
      })
      .catch((e) => console.log(e));
  };
  return (
    <Form onSubmit={submitMovie} style={{ width: "80%" }}>
      <FormGroup>
        <Label for="title" hidden>
          Title:
        </Label>
        <Input
          onChange={changeHandler}
          type="text"
          name="title"
          id="title"
          value={movie.title}
          placeholder="Film"
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
          value={movie.director}
          placeholder="Director"
        />
      </FormGroup>
      <FormGroup>
        <Label for="metascore" hidden>
          Metascore:
        </Label>
        <Input
          onChange={changeHandler}
          type="number"
          name="metascore"
          id="metascore"
          value={movie.metascore}
        />
      </FormGroup>

      <Button>Submit</Button>
    </Form>
  );
}

export default AddMovieForm;
