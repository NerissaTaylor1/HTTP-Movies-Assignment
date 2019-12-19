import React, { useState, useEffect } from 'react';
import axios from "axios";

const initialMovie = {
    id: "",
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
    const moviesLength = props.movies;

    const [movie, setMovie] = useState(initialMovie);
    useEffect(() => {
        if (moviesLength > 0) {
            const moviesEdit = props.movies.find(
                thing => `${thing.id}` === props.match.params.id);
            console.log(moviesEdit);
            setMovie(moviesEdit);
        }
    }, [props.movies, props.match.params.id]);

    const handleChange = event => {
        setMovie({
            ...movie,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (e, id) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res => {
                props.updateMovies(res.data, movie);
                props.history.push(`/`);
                setMovie({ movie: res.data, id })
            })
            .catch(err => console.log(err))
    }
    const handleStars = () => {
        const { stars } = initialMovie;
        stars.push(movie.actor);
        setMovie({ actor: '', stars });
    }
    // if (props.movies.length === 0) {
    //     return <h2>Loading data...</h2>
    // }
    return (
        <div>
            <h2>Update Form</h2>
            <form onSubmit={handleSubmit}>
                <input type="text"
                    name="id"
                    onChange={handleChange}
                    placeholder="id" value={movie.id} />
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

                <button className="md-button">
                    Update
                 </button>

            </form>
        </div>
    )
}
export default UpdateForm;