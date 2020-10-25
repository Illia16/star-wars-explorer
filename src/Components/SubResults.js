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

const SubResults = (props) => {
    const {location:{ data: { props: { states: { results, searchQuery} }, entity } } } = props;
    return(
        <>
            <AppBar>
                <Typography variant="h1" component="h1" align="center" >
                    {searchQuery}
                </Typography>
            </AppBar>

            {/* Below, rendering individual information of the entiry based on the search query (people || films || planets)  */}
            {
            searchQuery === "people" && results[searchQuery].results.length ?    
                <Card>
                    <List>
                        <Typography variant="h2" component="h2" align="center" >
                            {entity.name}
                        </Typography>

                        <ListItem>
                            Height: {entity.height}
                        </ListItem>
                        <ListItem>
                            Mass: {entity.mass}
                        </ListItem>
                        <ListItem>
                            Hair color: {entity.hair_color}
                        </ListItem>
                        <ListItem>
                            Skin Color: {entity.skin_color}
                        </ListItem>
                        <ListItem>
                            Gender: {entity.gender}
                        </ListItem>
                        <ListItem>
                            Birth year: {entity.birth_year}
                        </ListItem>
                    </List>
                </Card>
            : searchQuery === "films" && results[searchQuery].results.length ?
                <Card>
                    <List>
                        <Typography variant="h2" component="h2" align="center" >
                            {entity.title}
                        </Typography>
                        <ListItem>Director: {entity.director}</ListItem>
                        <ListItem>Producer: {entity.producer}</ListItem>
                        <ListItem>Release date: {entity.release_date}</ListItem>
                    </List>
                </Card>
            : searchQuery === "planets" && results[searchQuery].results.length ?       
                <Card>
                    <List>
                        <Typography variant="h2" component="h2" align="center" >
                            {entity.name}
                        </Typography>
                        <ListItem>Terrain: {entity.terrain}</ListItem>
                        <ListItem>Population: {entity.population}</ListItem>
                    </List>
                </Card>
            : <WaitingLogo></WaitingLogo>
            }
            
            {/* back to all ( people || films || planets)  link when results are loaded */}
            { (searchQuery && results[searchQuery].results.length) &&
            <div className="goToUpperLevel">
                <NavLink to={`/${searchQuery}`} >Back to all {searchQuery}</NavLink>
            </div>
            }
        </>
    )
};

export default SubResults;