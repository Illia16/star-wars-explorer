import React from 'react';
import { NavLink } from 'react-router-dom';

const People = (props) => {
    const {states:{ searchQuery },  loadMore } = props;

    const next = props.states.results[searchQuery].next;
    const previous = props.states.results[searchQuery].previous;

    const nextPage = next ? next.split('').pop() : null;
    const previousPage = previous ? previous.split('').pop() : null;

    return(
        <>  
            { searchQuery === "people" ?
                <>
                    <h1>People from Star Wars</h1>
                    <ul className="listOfEntities">
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
                </>
            : searchQuery === "films" ?
                <>
                    <h1>Star Wars Movies</h1>
                    <ul className="listOfEntities">
                        {
                            props.states.results.films.results.map((film) => {
                                return (
                                    <li key={film.title}>
                                        <NavLink to={`/movies/${film.title}`} >{film.title}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            : searchQuery === "planets" ?
                <>
                    <h1>planets</h1>
                    <ul className="listOfEntities">
                        {
                            props.states.results.planets.results.map( (planet) => {
                                return (
                                    <li key={planet.name}>
                                        <NavLink to={`/planets/${planet.name}`} >{planet.name}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </>
            : null
            }

            {
                next ?
                <div>
                    <button onClick={ () => loadMore(searchQuery, nextPage) }>Go to next page</button>
                    { previous && <button onClick={ () => loadMore(searchQuery, previousPage) }>Go to previous page</button> }
                </div>
                : previous ?
                <div>
                    <button onClick={ () => loadMore(searchQuery, previousPage) }>Go to previous page</button> 
                </div>
                : next && previous ?
                <div>
                    <button onClick={ () => loadMore(searchQuery, nextPage) }>Go to next page</button>
                    <button onClick={ () => loadMore(searchQuery, previousPage) }>Go to previous page</button> 
                </div>
                : <p>All {searchQuery} are displayed</p>
            }

            <NavLink to="/">Back to main menu</NavLink>
        </>
    )
}

export default People;