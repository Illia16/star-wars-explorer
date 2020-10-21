import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import "./styles/app.scss";

import Header from './Components/Header';
import MainMenu from './Components/MainMenu';
import MainResults from './Components/MainResults';
import SubResults from './Components/SubResults';

import CircularProgress from '@material-ui/core/CircularProgress';

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
        
        <Route exact path={["/people", "/films", "/planets"]}>
          { !this.state.isLoading && this.state.results[this.state.searchQuery] ? <MainResults states={this.state} switchPage={this.getData} /> : <CircularProgress></CircularProgress>     
          }
          { !this.state.searchQuery && <Redirect to="/"/> }
        </Route>

        <Route path={["/people/:peopleID", "/films/:filmsID", "/planets/:planetsID"]}  component={ SubResults } >
          { !this.state.searchQuery && <Redirect to="/"/> }
        </Route>
      </Router>
    );
  }
}
export default App;
