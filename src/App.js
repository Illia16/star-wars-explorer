// React
import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

// Material UI
import { Container } from '@material-ui/core/';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';
import WaitingLogo from './Components/presentational/WaitingLogo/WaitingLogo';

// My Sass styles
import "./styles/general.scss";

// Importing contexts
import { useInput } from './Components/smart/UserInput/UserInputContext'
import { useLoading } from './Components/smart/Loading/LoadingContext'
import { useError } from './Components/smart/Error/ErrorContext'
import { useResults } from './Components/smart/Results/ResultsContext'

// Components
const Header = lazy(() => import('./Components/presentational/header/Header'));
const MainMenu = lazy(() => import('./Components/views/MainMenu/MainMenu'));
const MainResults = lazy(() => import('./Components/views/MainResults/MainResults'));
const SubResults = lazy(() => import('./Components/views/SubResults/SubResults'));


function App() {
  const { searchQuery, setInput, currentPageRes, changePage, userChoice, searchQueryReset } = useInput();
  const { isLoading, setLoading } = useLoading();
  const { errorMsg, setErrorMsg } = useError();
  const { results } = useResults();

  // const [results, getData] = useState({people: null, films: null, planets: null});

  // useEffect( () => {
  //   if (searchQuery) {
  //     setLoading(true)
  //     axios({
  //         url: `https://swapi.dev/api/${searchQuery}`,
  //         method: 'GET',
  //         params: {
  //           page: currentPageRes,
  //         }
  //     })
  //     .then( (res) => {
  //       getData({...results, [searchQuery]: res.data})
  //       setLoading(false)
  //     })
  //     .catch( error => {
  //       // saving error msg from API in state for further use     
  //       error.response ? setErrorMsg(error.response.data.detail) : setErrorMsg('Bad URL');
  //       setLoading(false)
  //     })
  //   };
  // }, [searchQuery, currentPageRes]);

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