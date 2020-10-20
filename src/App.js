import React, { useState, useEffect, Suspense, lazy }from 'react';
import { BrowserRouter as Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Header from './Components/Header';
// import People from './Components/People';

const People = lazy( () => import('./Components/People'));

function App() {
  // changing input what user wants to search
  const [searchQuery, setInput] = useState(null);
  // saving the corresponding results from API call
  const [results, getData] = useState({people: null, films: null, planets: null});
  const [isLoading, setLoading] = useState(false);

  const userChoice = (e) => {
    setInput(e.target.name);
  }

  useEffect( () => {
    if (searchQuery) {
      setLoading(true)
      axios({
          url: `https://swapi.dev/api/${searchQuery}`,
          method: 'GET',
      })
      .then( (res) => { 
        getData({...results, [searchQuery]: res.data}) 
        setLoading(false)
      })
      .catch( error => { console.log(error); })
    }
  }, [searchQuery]);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/">
            <Header />
            <NavLink to="/people" name="people" onClick={ e => userChoice(e) } >people</NavLink>
            <NavLink to="/people" name="films" onClick={  e => userChoice(e) } >movies</NavLink>
            <NavLink to="/people" name="planets" onClick={  e => userChoice(e) } >planets</NavLink>
          </Route>

          <Route path='/people'>
            <People
              res={results.people}
              loadingStatus = {isLoading}
            />

            {/* <Movies props={results[searchQuery]}/>
            <Planets props={results[searchQuery]}/> */}
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
