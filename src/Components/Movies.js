import React from 'react';
import { NavLink } from 'react-router-dom';

const Movies = (props) => {
    console.log(props);
    return(
        <>
            <h1>Star Wars Movies</h1>
            <ul className="listOfMovies">
                {
                    props.states.results.films.results.map((film) => {
                        return (
                            <li key={film.title}>
                                <NavLink to={`/movies/${film.title}`} >{film.title}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>

            <NavLink to="/">Back to main menu</NavLink>
        </>
    )
}

export default Movies;