import React from 'react';
import { Route, NavLink } from 'react-router-dom';

const MainMenu = ( props ) => {
    const { userChoice } = props;

    return(
        <Route exact path="/">
            <NavLink to="/people" name="people" onClick={ userChoice } >People</NavLink>
            <NavLink to="/movies" name="films" onClick={  userChoice } >Movies</NavLink>
            <NavLink to="/planets" name="planets" onClick={userChoice } >Planets</NavLink>
        </Route>
    );
};

export default MainMenu;