import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const MainMenu = ( props ) => {
    const { userChoice } = props;

    return(
        <List>
            <ListItem>
                <Link to="/people" name="people" onClick={ userChoice } >People</Link>
            </ListItem>
            <ListItem>
                <NavLink to="/films" name="films" onClick={  userChoice } >Movies</NavLink>
            </ListItem>
            <ListItem>
                <NavLink to="/planets" name="planets" onClick={userChoice } >Planets</NavLink>
            </ListItem>
        </List>
    );
};

export default MainMenu;