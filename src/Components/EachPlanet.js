import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

class EachPlanet extends Component {
    constructor() {
        super();
        this.state = {
            planet: [],
        }
    }

    componentDidMount() {
        axios({
            url: `https://swapi.dev/api/planets/`,
            method: 'GET',
            params: {
                search: this.props.match.params.planetID,
            },
        })
        .then( (res) => {
            this.setState({
                planet: res.data.results,
            })
        })
        .catch( error => { console.log(error); })
    }

    render() {
        return(
            <>
                {
                    this.state.planet.length ?          
                    <div>
                        <h3>{this.state.planet[0].name}</h3>
                        <p>Terrain: {this.state.planet[0].terrain}</p>
                        <p>Population: {this.state.planet[0].population}</p>
                    </div>
                    : <div>Loading...</div>
                }
                <Route path="/planets">
                    <NavLink to="/planets" >Back to all planets</NavLink>
                </Route>
            </>
        )
    }
}

export default EachPlanet;