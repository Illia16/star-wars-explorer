// React
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

// Material UI
import Typography from '@material-ui/core/Typography';
import AppBar from'@material-ui/core/AppBar';
import WaitingLogo from '../styles/WaitingLogo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import 'fontsource-roboto';

// My Sass styles
import "../styles/app.scss";

class SubResults extends Component {
    constructor() {
        super();
        this.state = {
            results: [],
        }
    }

    // getting data from global props that were passed in MainResults.js
    // based on that making an api call for a specific entiry(e.g. speficic person, planet, movie)
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
                <AppBar>
                    <Typography variant="h1" component="h1" align="center" >
                        {searchQuery}
                    </Typography>
                </AppBar>

                {/* Below, rendering individual information of the entiry based on the search query (people || films || planets)  */}
                {
                searchQuery === "people" && this.state.results.length ?     
                    <Card>
                        <List>
                            <Typography variant="h2" component="h2" align="center" >
                                {this.state.results[0].name}
                            </Typography>

                            <ListItem>
                                Height: {this.state.results[0].height}
                            </ListItem>
                            <ListItem>
                                Mass: {this.state.results[0].mass}
                            </ListItem>
                            <ListItem>
                                Hair color: {this.state.results[0].hair_color}
                            </ListItem>
                            <ListItem>
                                Skin Color: {this.state.results[0].skin_color}
                            </ListItem>
                            <ListItem>
                                Gender: {this.state.results[0].gender}
                            </ListItem>
                            <ListItem>
                                Birth year: {this.state.results[0].birth_year}
                            </ListItem>
                        </List>
                    </Card>
                : searchQuery === "films" && this.state.results.length ?
                    <Card>
                        <List>
                            <Typography variant="h2" component="h2" align="center" >
                                {this.state.results[0].title}
                            </Typography>
                            <ListItem>Director: {this.state.results[0].director}</ListItem>
                            <ListItem>Producer: {this.state.results[0].producer}</ListItem>
                            <ListItem>Release date: {this.state.results[0].release_date}</ListItem>
                        </List>
                    </Card>
                : searchQuery === "planets" && this.state.results.length ?       
                    <Card>
                        <List>
                            <Typography variant="h2" component="h2" align="center" >
                                {this.state.results[0].name}
                            </Typography>
                            <ListItem>Terrain: {this.state.results[0].terrain}</ListItem>
                            <ListItem>Population: {this.state.results[0].population}</ListItem>
                        </List>
                    </Card>
                : <WaitingLogo></WaitingLogo>
                }
                
                {/* back to all ( people || films || planets)  link */}
                <div className="goToUpperLevel">
                    <NavLink to={`/${searchQuery}`} >Back to all {searchQuery}</NavLink>
                </div>
            </>
        )
    }
}

export default SubResults;