// React
import React from 'react';
import { NavLink } from 'react-router-dom';

// Material UI
import WaitingLogo from '../../presentational/WaitingLogo/WaitingLogo';
import 'fontsource-roboto';

// Header + SubResuletsComponents
import Header from '../../presentational/header/Header';
import SubResultsPerson from './SubResultsPerson';
import SubResultsFilm from './SubResultsFilm';
import SubResultsPlanet from './SubResultsPlanet';

const SubResults = (props) => {
    // entity is used to display a certain person/planet/movie detail.
    const {location:{ data: { props: {searchQuery, states }, entity } } } = props;
    return(
        <>
            <Header title={searchQuery}/>

            {/* Below, rendering individual information of the entiry based on the search query (people || films || planets)  */}
            {
            searchQuery === "people" && states[searchQuery].results.length ?    
                <SubResultsPerson entity={entity} />
            : searchQuery === "films" && states[searchQuery].results.length ?
                <SubResultsFilm entity={entity} />
            : searchQuery === "planets" && states[searchQuery].results.length ?
                <SubResultsPlanet entity={entity} />
            : <WaitingLogo></WaitingLogo>
            }
            
            {/* back to all ( people || films || planets)  link when results are loaded */}
            { (searchQuery && states[searchQuery].results.length) &&
            <div className="goToUpperLevel">
                <NavLink to={`/${searchQuery}`} >Back to all {searchQuery}</NavLink>
            </div>
            }
        </>
    )
};

export default SubResults;