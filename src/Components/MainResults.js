import React from 'react';
import { NavLink } from 'react-router-dom';
import "../styles/app.scss";

import Typography from '@material-ui/core/Typography';
import AppBar from'@material-ui/core/AppBar';
import 'fontsource-roboto';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import WaitingLogo from '../styles/WaitingLogo';
import Button from '@material-ui/core/Button';
import "../styles/app.scss";

// import MyButton from '../styles/MyButton';

const MainResults = (props) => {
    const {states:{ searchQuery, isLoading },  switchPage } = props;
    console.log(props);

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

            <List>
                {
                    props.states.results[searchQuery].results.map((entity) => {
                        return (
                            searchQuery === "people" ?
                            <ListItem key={entity.name} >
                                <NavLink to={{ pathname: `/people/${entity.name}`, data: {props} }}>{entity.name}</NavLink>
                            </ListItem>
                            : searchQuery === "films" ?
                            <ListItem  key={entity.title}>
                                <NavLink to={{ pathname: `/films/${entity.title}`, data: {props} }} >{entity.title}</NavLink>
                            </ListItem>
                            : searchQuery === "planets" ?
                            <ListItem key={entity.name}>
                                <NavLink to={{ pathname: `/planets/${entity.name}`, data: {props} }} >{entity.name}</NavLink>
                            </ListItem>
                            : null
                        )
                    })
                }
            </List>
            
            {
                next ?
                <div>
                    { previous && <Button onClick={ () => switchPage(searchQuery, previousPage) } >Go to previous page</Button> }
                    <Button onClick={ () => switchPage(searchQuery, nextPage) }>Go to next page</Button>
                </div>
                : previous ?
                <div>
                    <Button onClick={ () => switchPage(searchQuery, previousPage) }>Go to previous page</Button> 
                </div>
                : next && previous ?
                <div>
                    <Button onClick={ () => switchPage(searchQuery, previousPage) }>Go to previous page</Button> 
                    <Button onClick={ () => switchPage(searchQuery, nextPage) }>Go to next page</Button>
                </div>
                : <p>All {searchQuery} are displayed</p>
            }

            <div>
                <NavLink to="/">Back to main menu</NavLink>
            </div>
        </>
    )
}

export default MainResults;