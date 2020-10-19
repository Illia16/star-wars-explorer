import React from 'react';
import {BrowserRouter as Switch, Route, NavLink } from 'react-router-dom';

const People = () => {

    const PeopleRes = () => {
        return(
            <div>People from Star Wars</div>
        )
    };
    
    return (
        <Route path="/people" component={ PeopleRes } />
    )
}

export default People;