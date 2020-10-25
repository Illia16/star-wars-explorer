// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';
import AppBar from'@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';

// My Sass styles
import "../styles/app.scss";

const MainResults = (props) => {
    const {states:{ searchQuery },  switchPage } = props;

    // figuring out wheather there's more pages for more results (more than 10 entities)

    // strings for next/previous pages from API
    const next = props.states.results[searchQuery].next;
    const previous = props.states.results[searchQuery].previous;

    // getting a previous/next page number from the strings. If no page, then null
    const nextPage = next ? next.split('').pop() : null;
    const previousPage = previous ? previous.split('').pop() : null;

    return(
        <>
            <AppBar>
                <Typography variant="h1" component="h1" align="center" >
                {searchQuery}
                </Typography>
            </AppBar>
            
            {/* checking if there's only 1 page for results (10 or less entities based on the API structure) */}
            {
                (!next && !previous) &&
                <Typography variant="h2" component="h2" align="center" >
                    All {searchQuery} are displayed
                </Typography>
            }
            
            {/* getting a list of entities (people || films || planets), based on the user selection */}
            <List className="subList">
                {
                    props.states.results[searchQuery].results.map((entity) => {
                        return (
                            searchQuery === "people" ?
                            <ListItem key={entity.name} >
                                <NavLink to={{ pathname: `/people/${entity.name}`, data: {props, entity} }}>{entity.name}</NavLink>
                            </ListItem>
                            : searchQuery === "films" ?
                            <ListItem  key={entity.title}>
                                <NavLink to={{ pathname: `/films/${entity.title}`, data: {props, entity} }} >{entity.title}</NavLink>
                            </ListItem>
                            : searchQuery === "planets" ?
                            <ListItem key={entity.name}>
                                <NavLink to={{ pathname: `/planets/${entity.name}`, data: {props, entity} }} >{entity.name}</NavLink>
                            </ListItem>
                            : null
                        )
                    })
                }
            </List>
            
            {/* after the fist api call, looking at the API results wheather there is next/previous pages available; rendering(or not) button "Next page" if there's more than 10 entiries in the results  */}
            {/* rendering "Previous page" only when "Next page" is clicked so that there's an API call made to get the next 10 results */}
            {/* Clicking "Next page" or "Previous page" makes a corresponding API call after which new results are rendered*/}
            {
                next ?
                    <div className="nextPrevPages">
                        { previous && <Button onClick={ () => switchPage(searchQuery, previousPage) } >Previous page</Button> }
                        <Button onClick={ () => switchPage(searchQuery, nextPage) }>Next page</Button>
                    </div>
                : previous ?
                    <div className="nextPrevPages">
                        <Button onClick={ () => switchPage(searchQuery, previousPage) }>Previous page</Button> 
                    </div>
                : (next && previous) ?
                    <div className="nextPrevPages">
                        <Button onClick={ () => switchPage(searchQuery, previousPage) }>Previous page</Button> 
                        <Button onClick={ () => switchPage(searchQuery, nextPage) }>Next page</Button>
                    </div>
                :   null
            }

            {/* Back to main menu link */}
            <div className="goToUpperLevel">
                <NavLink to="/">Back to main menu</NavLink>
            </div>
        </>
    )
}

export default MainResults;