import React, { useState, useEffect } from 'react';
import axios from "axios";
const initialMovie = {
    id: 5,
    title: '',
    director: '',
    metascore: '',
    stars: []
};
const UpdateForm = props => {
    const [movie, setMovie] = useState(iniialMovie);
    useEffect(() => {
        const movieToEdit = props.movies.find(
            e => `${e.id}` === props.match.params.id
        );
        console.log(props.movies, movieToEdit);
        if (movieToEdit) {
            setMovie(movieToEdit);
        }
    }, [props.movies, props.match.params.id]);
    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovies(res.data);
                props.history.push(`/movie-list`)
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <h2>Update Form</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder="title"
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    placeholder="director"
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    placeholder="metascore"
                    value={movie.metascore}
                />
            </form>
        </div>
    )
}
export default UpdateForm;