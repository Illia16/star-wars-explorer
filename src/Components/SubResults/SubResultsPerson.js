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

const SubResultsPerson = (props) => {
    // entity is used to display a certain person/planet/movie detail.
    const { entity:{ name, height, mass, hair_color, skin_color, gender, birth_year } } = props;
    return(
        <Card>
            <List>
                <Typography variant="h2" component="h2" align="center" >
                    {name}
                </Typography>

                <ListItem>
                    Height: {height}
                </ListItem>
                <ListItem>
                    Mass: {mass}
                </ListItem>
                <ListItem>
                    Hair color: {hair_color}
                </ListItem>
                <ListItem>
                    Skin Color: {skin_color}
                </ListItem>
                <ListItem>
                    Gender: {gender}
                </ListItem>
                <ListItem>
                    Birth year: {birth_year}
                </ListItem>
            </List>
        </Card>
    )
};

export default SubResultsPerson;