import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import AppBar from'@material-ui/core/AppBar';
import WaitingLogo from '../styles/WaitingLogo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'fontsource-roboto';
import "../styles/app.scss";

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
        console.log(this.props);

        return(
            <>
                <AppBar>
                    <Typography variant="h4" component="h1" align="center" >
                        {searchQuery}
                    </Typography>
                </AppBar>
                {  searchQuery === "people" && this.state.results.length ?          
                    <>
                        <List>
                            <Typography variant="h5" component="h3" align="center" >
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
                    </>
                    : searchQuery === "films" && this.state.results.length ?
                        
                    <>
                        <List>
                            <Typography variant="h5" component="h3" align="center" >
                                {this.state.results[0].title}
                            </Typography>
                            <ListItem>Director: {this.state.results[0].director}</ListItem>
                            <ListItem>Producer: {this.state.results[0].producer}</ListItem>
                            <ListItem>Release date: {this.state.results[0].release_date}</ListItem>
                        </List>
                    </>
                    : searchQuery === "planets" && this.state.results.length ?       
                    <>
                        <List>
                            <Typography variant="h5" component="h3" align="center" >
                                {this.state.results[0].name}
                            </Typography>
                            <ListItem>Terrain: {this.state.results[0].terrain}</ListItem>
                            <ListItem>Population: {this.state.results[0].population}</ListItem>
                        </List>
                    </>
                    : <WaitingLogo></WaitingLogo>
                }
                
                <div>
                    <NavLink to={`/${searchQuery}`} >Back to all {searchQuery}</NavLink>
                </div>
            </>
        )
    }
}

export default SubResults;