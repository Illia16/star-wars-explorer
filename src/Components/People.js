import React from 'react';
import {BrowserRouter as Switch, Route, NavLink } from 'react-router-dom';

const People = (props) => {
    console.log(props);

    const PeopleRes = () => {
        return(
            <>
                <h2>People from Star Wars</h2>
                <ul className="listOfPeople">
                    {
                        !props.loadingStatus ?
                        props.res.results.map((person) => {
                            return (
                                <>
                                    {/* <li key={person.name}>{person.name}</li> */}
                                    <NavLink to={`/${person.name}`} key={person.name}>{person.name}</NavLink>
                                </>
                            )
                        })
                        : <div>Loading...</div>
                    }
                </ul>
                <NavLink to="/">Back to main menu</NavLink>
            </>
        )
    };
    
    return (
        <Route path="/people" component={ PeopleRes } />
    )
}

export default People;