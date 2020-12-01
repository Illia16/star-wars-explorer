// React
import React from 'react';

// Material UI
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import 'fontsource-roboto';

const SubResultsFilm = (props) => {
    // entity is used to display a certain person/planet/movie detail.
    const { entity:{ title, director, producer, release_date } } = props;
    return(
        <Card>
            <List>
                <Typography variant="h2" component="h2" align="center" >
                    {title}
                </Typography>
                <ListItem>Director: {director}</ListItem>
                <ListItem>Producer: {producer}</ListItem>
                <ListItem>Release date: {release_date}</ListItem>
            </List>
        </Card>
    )
};

export default SubResultsFilm;