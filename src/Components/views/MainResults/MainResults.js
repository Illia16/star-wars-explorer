// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';

// UI Components
import Header from '../../presentational/header/Header';

// Functions
import checkNextPage from '../../../helpers/checkNextPage';
import checkPreviousPage from '../../../helpers/checkPreviousPage';

const MainResults = (props) => {
    const {searchQuery, changePage, searchQueryReset } = props;

    const nextPage = checkNextPage(props.states[searchQuery].next);
    const previousPage = checkPreviousPage(props.states[searchQuery].previous);
    return(
        <>
            <Header title={searchQuery}/>
            
            {/* checking if there's only 1 page for results (10 or less entities based on the API structure) */}
            {
                (!nextPage && !previousPage) &&
                <Typography variant="h2" component="h2" align="center" >
                    All {searchQuery} are displayed
                </Typography>
            }
            
            {/* getting a list of entities (people || films || planets), based on the user selection */}
            <List className="subList">
                {
                    props.states[searchQuery].results.map((entity) => {
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
                nextPage ?
                    <div className="nextPrevPages">
                        { previousPage && <Button onClick={ () => changePage(previousPage) } >Previous page</Button> }
                        <Button onClick={ () => changePage(nextPage) }>Next page</Button>
                    </div>
                : previousPage ?
                    <div className="nextPrevPages">
                        <Button onClick={ () => changePage(previousPage) } >Previous page</Button>
                    </div>
                : (nextPage && previousPage) ?
                    <div className="nextPrevPages">
                        <Button onClick={ () => changePage(previousPage) } >Previous page</Button>
                        <Button onClick={ () => changePage(nextPage) }>Next page</Button>
                    </div>
                :   null
            }

            {/* Back to main menu link */}
            <div className="goToUpperLevel">
                <NavLink to="/" onClick={ searchQueryReset }>Back to main menu</NavLink>
            </div>
        </>
    )
}

export default MainResults;