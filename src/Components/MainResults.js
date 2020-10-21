import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/app.scss";

import Typography from '@material-ui/core/Typography';
import AppBar from'@material-ui/core/AppBar';

const MainResults = (props) => {
    const {states:{ searchQuery },  switchPage } = props;

    const next = props.states.results[searchQuery].next;
    const previous = props.states.results[searchQuery].previous;

    const nextPage = next ? next.split('').pop() : null;
    const previousPage = previous ? previous.split('').pop() : null;

    return(
        <>  
            <AppBar>
                <Typography variant="h4" component="h1" align="center" >
                Star Wars {searchQuery}
                </Typography>
            </AppBar>

            <ul className="listOfEntities">
                {
                    props.states.results[searchQuery].results.map((entity) => {
                        return (
                            searchQuery === "people" ?
                            <li key={entity.name}>
                                <NavLink to={{ pathname: `/people/${entity.name}`, data: {props} }}>{entity.name}</NavLink>
                            </li>
                            : searchQuery === "films" ?
                            <li key={entity.title}>
                                <NavLink to={{ pathname: `/films/${entity.title}`, data: {props} }} >{entity.title}</NavLink>
                            </li>
                            : searchQuery === "planets" ?
                            <li key={entity.name}>
                                <NavLink to={{ pathname: `/planets/${entity.name}`, data: {props} }} >{entity.name}</NavLink>
                            </li>
                            : null
                        )
                    })
                }
            </ul>
            
            {
                next ?
                <div>
                    { previous && <button onClick={ () => switchPage(searchQuery, previousPage) }>Go to previous page</button> }
                    <button onClick={ () => switchPage(searchQuery, nextPage) }>Go to next page</button>
                </div>
                : previous ?
                <div>
                    <button onClick={ () => switchPage(searchQuery, previousPage) }>Go to previous page</button> 
                </div>
                : next && previous ?
                <div>
                    <button onClick={ () => switchPage(searchQuery, previousPage) }>Go to previous page</button> 
                    <button onClick={ () => switchPage(searchQuery, nextPage) }>Go to next page</button>
                </div>
                : <p>All {searchQuery} are displayed</p>
            }

            <NavLink to="/">Back to main menu</NavLink>
        </>
    )
}

export default MainResults;