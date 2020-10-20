import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class EachPerson extends Component {
    constructor() {
        super();
        this.state = {
            person: [],
        }
    }

    componentDidMount() {
        console.log(this);
        axios({
            url: `https://swapi.dev/api/people/`,
            method: 'GET',
            params: {
                search: this.props.match.params.personID,
            },
        })
        .then( (res) => {
            this.setState({
                person: res.data.results,
            })
        })
        .catch( error => { console.log(error); })
    }

    render() {
        console.log(this.state);
        return(
            <>
                {
                    this.state.person.length ?          
                    <div>
                        <h3>{this.state.person[0].name}</h3>
                        <p>Height: {this.state.person[0].height}</p>
                        <p>Mass: {this.state.person[0].mass}</p>
                        <p>Hair color: {this.state.person[0].hair_color}</p>
                        <p>Skin Color: {this.state.person[0].skin_color}</p>
                        <p>Gender: {this.state.person[0].gender}</p>
                        <p>Birth year: {this.state.person[0].birth_year}</p>
                    </div>
                    : <div>Loading...</div>
                }
                <Route path="/people">
                    <NavLink to="/people" >Back to all people</NavLink>
                </Route>
            </>
        )
    }
}

export default EachPerson;