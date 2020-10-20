import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class EachMovie extends Component {
    constructor() {
        super();
        this.state = {
            movie: [],
        }
    }

    componentDidMount() {
        axios({
            url: `https://swapi.dev/api/films/`,
            method: 'GET',
            params: {
                search: this.props.match.params.movieID,
            },
        })
        .then( (res) => {
            this.setState({
                movie: res.data.results,
            })
        })
        .catch( error => { console.log(error); })
    }

    render() {
        return(
            <>
                {
                    this.state.movie.length ?          
                    <div>
                        <h3>{this.state.movie[0].title}</h3>
                        <p>Director: {this.state.movie[0].director}</p>
                        <p>Producer: {this.state.movie[0].producer}</p>
                        <p>Release date: {this.state.movie[0].release_date}</p>
                    </div>
                    : <div>Loading...</div>
                }
                <Route path="/movies">
                    <NavLink to="/movies" >Back to all movies</NavLink>
                </Route>
            </>
        )
    }
}

export default EachMovie;