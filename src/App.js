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
import "./styles/general.scss";

// Components
const Header = lazy(() => import('./Components/presentational/header/Header'));
const MainMenu = lazy(() => import('./Components/views/MainMenu/MainMenu'));
const MainResults = lazy(() => import('./Components/views/MainResults/MainResults'));
const SubResults = lazy(() => import('./Components/SubResults/SubResults'));


function App() {
  // saving the corresponding results from API call
  const [searchQuery, setInput] = useState(null);
  const [currentPageRes, changePage] = useState(1);

  const [results, getData] = useState({people: null, films: null, planets: null});
  const [isLoading, setLoading] = useState(false);
  const [loadingErrorMsg, setloadingErrorMsg] = useState(null);

  const userChoice = (e) => {
    setInput(e.target.name);
  };

  const searchQueryReset = () => {
    setInput(null);
    changePage(1);
  };

  useEffect( () => {
    if (searchQuery) {
      setLoading(true)
      // setLoading()
      axios({
          url: `https://swapi.dev/api/${searchQuery}`,
          method: 'GET',
          params: {
            page: currentPageRes,
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
  }, [searchQuery, currentPageRes]);

  return (
    // Material UI for styling, Router, Components
    <ThemeProvider theme={theme}>
      <Container maxWidth={false}>
        <Router basename={process.env.PUBLIC_URL}>
          <Suspense fallback={ <WaitingLogo></WaitingLogo> }>
            <Route exact path="/">
              <Header title={searchQuery} />
              <MainMenu
                states={results} 
                userChoice={userChoice}
              />
            </Route>
            
            {/* Rendering MainResults component only when API call is done(loading ended) and there's results available */}
            <Route exact path={["/people/", "/films/", "/planets/"]}>
              { !isLoading && results[searchQuery] ? <MainResults states={results} searchQuery={searchQuery} changePage={changePage} searchQueryReset={searchQueryReset} /> : <WaitingLogo></WaitingLogo>
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

export default App;
