// React
import React from 'react';

// Material UI
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import 'fontsource-roboto';

// My Sass styles
import "../../styles/general.scss";

const SubResultsPlanet = (props) => {
    // entity is used to display a certain person/planet/movie detail.
    const { entity:{ name, terrain, population } } = props;
    return(
        <Card>
            <List>
                <Typography variant="h2" component="h2" align="center" >
                    {name}
                </Typography>
                <ListItem>Terrain: {terrain}</ListItem>
                <ListItem>Population: {population}</ListItem>
            </List>
        </Card>
    )
};

export default SubResultsPlanet;