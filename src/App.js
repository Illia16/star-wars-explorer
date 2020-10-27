// React
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

// Material UI
import { Container } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import WaitingLogo from './styles/WaitingLogo';

// My Sass styles
import "./styles/app.scss";

// Redux
import { connect } from 'react-redux';
import { setUserChoice, setSearchPage, setLoading} from './actions';

// What state need to listen to
const mapStateToProps = (state) => {
  return {
    searchQuery: state.setSearchQuery.searchQuery,
    page: state.setPage.page,
    isLoading: state.setLoading.isLoading,
  }
};

// What states need to get dispatched(actions)
const mapDispatchToProps = (dispatch) => {
  return {
    userChoice: (e) => dispatch(setUserChoice(e.target.name)),
    setPage: (val) => dispatch(setSearchPage(val)),
    setLoading: () => dispatch(setLoading()),
  }
};

// Components
const Header = lazy(() => import('./Components/Header'));
const MainMenu = lazy(() => import('./Components/MainMenu'));
const MainResults = lazy(() => import('./Components/MainResults'));
const SubResults = lazy(() => import('./Components/SubResults'));


function App(props) {
  console.log(props);
  // const {page, setPage, isLoading, setLoading, searchQuery, userChoice } = props;
  const {page, setPage, searchQuery, userChoice } = props;

  // saving the corresponding results from API call
  const [results, getData] = useState({people: null, films: null, planets: null});
  const [isLoading, setLoading] = useState(false);
  const [loadingErrorMsg, setloadingErrorMsg] = useState(null);


  useEffect( () => {
    if (searchQuery) {
      setLoading(true)
      // setLoading()
      axios({
          url: `https://swapi.dev/api/${searchQuery}`,
          method: 'GET',
          params: {
            page: page,
          }
      })
      .then( (res) => {
        getData({...results, [searchQuery]: res.data}) 
        setLoading(false)
        // setLoading()
      })
      .catch( error => {
        // saving error msg from API in state for further use
          setloadingErrorMsg(error.response.data.detail);
      })
    };
  }, [searchQuery, page]);

  return (
    // Material UI for styling, Router, Components
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <Router basename={process.env.PUBLIC_URL}>
          <Suspense fallback={ <WaitingLogo></WaitingLogo> }>
            <Route exact path="/">
              <Header />
              <MainMenu
                states={results} 
                userChoice={userChoice}
              />
            </Route>
            
            {/* Rendering MainResults component only when API call is done(loading ended) and there's results available */}
            <Route exact path={["/people/", "/films/", "/planets/"]}>
              { !isLoading && results[searchQuery] ? <MainResults states={results} searchQuery={searchQuery} setPage={setPage} /> : <WaitingLogo></WaitingLogo>
              }
              {/* Redirecting to main page if route is other than "/" AND there's no searchQuery(page refreshed) */}
              { !searchQuery && <Redirect to="/"/> }
            </Route>
            
            {/* Rendering SubResults component based on every unique path */}
            <Route path={["/people/:peopleID/", "/films/:filmsID/", "/planets/:planetsID/"]}  component={ SubResults } >
              { !searchQuery && <Redirect to="/"/> }
            </Route>
          </Suspense>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);