import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class SubResults extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
        }
    }

    componentDidMount() {
        const {location:{ data: { props: { states: { searchQuery } }} } } = this.props;

        axios({
            url: `https://swapi.dev/api/${searchQuery}/`,
            method: 'GET',
            params: {
                search: this.props.match.params[searchQuery + "ID"],
            },
        })
        .then( (res) => {
            this.setState({
                results: res.data.results,
            })
        })
        .catch( error => { console.log(error); })
    }

    render() {
        const {location:{ data: { props: { states: { searchQuery } }} } } = this.props;
        return(
            <>
                {  searchQuery === "people" && this.state.results.length ?          
                    <div>
                        <h3>{this.state.results[0].name}</h3>
                        <p>Height: {this.state.results[0].height}</p>
                        <p>Mass: {this.state.results[0].mass}</p>
                        <p>Hair color: {this.state.results[0].hair_color}</p>
                        <p>Skin Color: {this.state.results[0].skin_color}</p>
                        <p>Gender: {this.state.results[0].gender}</p>
                        <p>Birth year: {this.state.results[0].birth_year}</p>
                    </div>
                    : searchQuery === "films" && this.state.results.length ?
                        
                    <div>
                        <h3>{this.state.results[0].title}</h3>
                        <p>Director: {this.state.results[0].director}</p>
                        <p>Producer: {this.state.results[0].producer}</p>
                        <p>Release date: {this.state.results[0].release_date}</p>
                    </div>
                    : searchQuery === "planets" && this.state.results.length ?       
                    <div>
                        <h3>{this.state.results[0].name}</h3>
                        <p>Terrain: {this.state.results[0].terrain}</p>
                        <p>Population: {this.state.results[0].population}</p>
                    </div>
                    : <div>Loading...</div>
                }
                
                <Route path={`/${searchQuery}`}>
                    <NavLink to={`/${searchQuery}`} >Back to all {searchQuery}</NavLink>
                </Route>
            </>
        )
    }
}

export default SubResults;