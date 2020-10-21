import React from 'react';
import { Route, NavLink } from 'react-router-dom';

const MainMenu = ( props ) => {
    const { userChoice } = props;

    return(
        <Route exact path="/">
            <li><NavLink to="/people" name="people" onClick={ userChoice } >People</NavLink></li>
            <li><NavLink to="/films" name="films" onClick={  userChoice } >Movies</NavLink></li>
            <li><NavLink to="/planets" name="planets" onClick={userChoice } >Planets</NavLink></li>
        </Route>
    );
};

export default MainMenu;