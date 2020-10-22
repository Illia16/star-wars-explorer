// React
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

// Components
import Header from './Components/Header';
import MainMenu from './Components/MainMenu';
import MainResults from './Components/MainResults';
import SubResults from './Components/SubResults';

// Material UI
import { Container } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import WaitingLogo from './styles/WaitingLogo';

// My Sass styles
import "./styles/app.scss";

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
      // Material UI for styling, Router, Components
      <ThemeProvider theme={theme}>
        <Container>
          <Router basename={process.env.PUBLIC_URL}>
            <Route exact path="/">
              <Header />
              <MainMenu
                states={this.state} 
                userChoice={this.userChoice}
              />
            </Route>
            
            {/* Rendering MainResults component only when API call is done(loading ended) and there's results available */}
            <Route exact path={["/people", "/films", "/planets"]}>
              { !this.state.isLoading && this.state.results[this.state.searchQuery] ? <MainResults states={this.state} switchPage={this.getData} /> : <WaitingLogo></WaitingLogo>
              }
              
              {/* Redirecting to main page if route is other than "/" AND there's no searchQuery(page refreshed) */}
              { !this.state.searchQuery && <Redirect to="/"/> }
            </Route>
            
            {/* Rendering SubResults component based on every unique path */}
            <Route path={["/people/:peopleID", "/films/:filmsID", "/planets/:planetsID"]}  component={ SubResults } >
              { !this.state.searchQuery && <Redirect to="/"/> }
            </Route>
          </Router>
        </Container>
      </ThemeProvider>
    );
  };
};

export default App;