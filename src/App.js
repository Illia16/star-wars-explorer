// React
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

// Material UI
import { Container } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import WaitingLogo from './styles/WaitingLogo';

// My Sass styles
import "./styles/app.scss";

// Components
const Header = lazy(() => import('./Components/Header'));
const MainMenu = lazy(() => import('./Components/MainMenu'));
const MainResults = lazy(() => import('./Components/MainResults'));
const SubResults = lazy(() => import('./Components/SubResults'));

class App extends Component {
  constructor() {
      super();
      this.state = {
        searchQuery: '',
        results: {people: null, films: null, planets: null},
        isLoading: false,
        loadingErrorMsg: null,
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
    .catch( error => {
      // saving error msg from API in state for further use
      this.setState({
        loadingErrorMsg: error.response.data.detail
      });
    })
  }

  render() {
    return (
      // Material UI for styling, Router, Components
      <ThemeProvider theme={theme}>
        <Container maxWidth={false}>
          <Router basename={process.env.PUBLIC_URL}>
            <Suspense fallback={ <WaitingLogo></WaitingLogo> }>
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
            </Suspense>
          </Router>
        </Container>
      </ThemeProvider>
    );
  };
};

export default App;