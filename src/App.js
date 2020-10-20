import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './Components/Header';
import MainMenu from './Components/MainMenu';
import People from './Components/People';
import EachPerson from './Components/EachPerson';
import EachMovie from './Components/EachMovie';
import EachPlanet from './Components/EachPlanet';

class App extends Component {
  constructor() {
      super();
      this.state = {
        searchQuery: '',
        results: {people: null, films: null, planets: null},
        isLoading: false,
      };
  };

  userChoice = async (e) => {
    await this.setState({
      searchQuery: e.target.name,
    })

    this.getData(this.state.searchQuery, 1)

  }

  getData = (whatToGet, page) => {
    this.setState({ isLoading: true });
    axios({
      url: `https://swapi.dev/api/${whatToGet}`,
      method: 'GET',
      params: {
        page: page,
    },
  })
  .then( (res) => {
    this.setState({
      isLoading: false,
      results: {
        ...this.state.results,
        [this.state.searchQuery]: res.data,
      }
    })
  })
  .catch( error => { console.log(error); })
  }




  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Route exact path="/">
          <Header />
          <MainMenu
            states={this.state} 
            userChoice={this.userChoice}
          />
        </Route>
        
        <Route exact path={["/people", "/movies", "/planets"]}>
          { !this.state.isLoading && this.state.results[this.state.searchQuery] ? <People states={this.state} loadMore={this.getData} /> : <div>Loading...</div>
          }
        </Route>

        <Route path="/people/:personID" component={ EachPerson } />
        <Route path="/movies/:movieID" component={ EachMovie } />
        <Route path="/planets/:planetID" component={ EachPlanet } />
      </Router>
    );
  }
}
export default App;
