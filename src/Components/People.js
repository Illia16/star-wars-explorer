import React from 'react';
import { NavLink } from 'react-router-dom';

const People = (props) => {
    const {states:{results:{people: {next, previous} }, searchQuery },  loadMore } = props;
    console.log(next, searchQuery, loadMore);
    console.log(props);

    const nextPage = next ? next.split('').pop() : null;
    const previousPage = previous ? previous.split('').pop() : null;
    console.log(nextPage);

    return(
        <>
            <h1>People from Star Wars</h1>
            <ul className="listOfPeople">
                {
                    props.states.results.people.results.map((person) => {
                        return (
                            <li key={person.name}>
                                <NavLink to={`/people/${person.name}`} >{person.name}</NavLink>
                            </li>
                        )
                    })
                }
            </ul>
            
            { next ? 
                <div>
                    <button onClick={ () => loadMore(searchQuery, nextPage) }>Go to next page</button>
                    { previous && <button onClick={ () => loadMore(searchQuery, previousPage) }>Go to previous page</button> }
                </div>
                : 
                <div>
                    <p>No more characters</p>
                    <button onClick={ () => loadMore(searchQuery, previousPage) }>Go to previous page</button> 
                </div>
            }

            <NavLink to="/">Back to main menu</NavLink>
        </>
    )
}

export default People;