import React from 'react';
import { BrowserRouter as Switch, Route, NavLink } from 'react-router-dom';

import Header from './Components/Header';
import People from './Components/People';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Header />
          <NavLink to="/people">people</NavLink>
        </Route>

        <Route path="/people">
          <People />
        </Route>
      </Switch>
    </>
  );
}

export default App;
