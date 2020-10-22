// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import 'fontsource-roboto';

// My Sass styles
import "../styles/app.scss";

const MainMenu = ( props ) => {
    const { userChoice } = props;

    return(
        <>  
            {/* Main Menu list */}
            <List className="topLevelLists">
                <ListItem>
                    <NavLink to="/people" name="people" onClick={ userChoice } >People</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/films" name="films" onClick={  userChoice } >Movies</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/planets" name="planets" onClick={userChoice } >Planets</NavLink>
                </ListItem>
            </List>
        </>
    );
};

export default MainMenu;