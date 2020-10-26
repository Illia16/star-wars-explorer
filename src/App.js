// React
import React, { Component, Suspense, lazy, useState, useEffect } from 'react';
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
import { setUserChoice, setSearchPage } from './actions';

// What state need to listen to
const mapStateToProps = (state) => {
  return {
    searchQuery: state.searchQuery,
  }
};

// What states need to get dispatched(actions)
const mapDispatchToProps = (dispatch) => {
  return {
    userChoice: (e) => dispatch(setUserChoice(e.target.name))
  }
};

// Components
const Header = lazy(() => import('./Components/Header'));
const MainMenu = lazy(() => import('./Components/MainMenu'));
const MainResults = lazy(() => import('./Components/MainResults'));
const SubResults = lazy(() => import('./Components/SubResults'));





function App(props) {
  const {searchQuery, userChoice } = props;

  // saving the corresponding results from API call
  const [results, getData] = useState({people: null, films: null, planets: null});
  const [isLoading, setLoading] = useState(false);
  const [loadingErrorMsg, setloadingErrorMsg] = useState(null);


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
      .catch( error => {
        // saving error msg from API in state for further use
          setloadingErrorMsg(error.response.data.detail);
      })
    };
  }, [searchQuery]);

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
              {/* <button name="people" onClick={userChoice} >CLICK ME</button> */}
            </Route>
            
            {/* Rendering MainResults component only when API call is done(loading ended) and there's results available */}
            <Route exact path={["/people/", "/films/", "/planets/"]}>
              { !isLoading && results[searchQuery] ? <MainResults states={results} searchQuery={searchQuery} switchPage={userChoice} /> : <WaitingLogo></WaitingLogo>
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







// class App extends Component {
//   constructor() {
//       super();
//       this.state = {
//         searchQuery: '',
//         results: {people: null, films: null, planets: null},
//         isLoading: false,
//         loadingErrorMsg: null,
//       };
//   };
  
//   componentDidUpdate() {
//     if (this.props.searchQuery) {
//       this.getData(this.props.searchQuery, 1)
//     }
//   };

//   // declaring the function that sets state for user's choice first, then makes an API call based on the user selection  
//   // userChoice = async (e) => {
//   //   await this.setState({
//   //     searchQuery: e.target.name,
//   //   })

//   //   this.getData(this.state.searchQuery, 1)
//   // };

//   getData = (whatToGet, page) => {
//     this.setState({ isLoading: true });
//       axios({
//         url: `https://swapi.dev/api/${whatToGet}`,
//         method: 'GET',
//         params: {
//           page: page,
//       },
//     })
//     .then( (res) => {
//       this.setState({
//         isLoading: false,
//         results: {
//           ...this.state.results,
//           [this.state.searchQuery]: res.data,
//         }
//       })
//     })
//     .catch( error => {
//       // saving error msg from API in state for further use
//       this.setState({
//         loadingErrorMsg: error.response.data.detail
//       });
//     })
//   }

//   render() {
//     console.log(this.props);
//     const {searchQuery, userChoice } = this.props;

//     return (
//       // Material UI for styling, Router, Components
//       <ThemeProvider theme={theme}>
//         <Container maxWidth={false}>
//           <Router basename={process.env.PUBLIC_URL}>
//             <Suspense fallback={ <WaitingLogo></WaitingLogo> }>
//               <Route exact path="/">
//                 <Header />
//                 <MainMenu
//                   states={this.state} 
//                   // userChoice={this.userChoice}
//                   userChoice={userChoice}
//                 />
//                 <button name="people" onClick={userChoice} >CLICK ME</button>
//               </Route>
              
//               {/* Rendering MainResults component only when API call is done(loading ended) and there's results available */}
//               <Route exact path={["/people/", "/films/", "/planets/"]}>
//                 { !this.state.isLoading && this.state.results[this.state.searchQuery] ? <MainResults states={this.state} switchPage={this.getData} /> : <WaitingLogo></WaitingLogo>
//                 }
                
//                 {/* Redirecting to main page if route is other than "/" AND there's no searchQuery(page refreshed) */}
//                 { !this.state.searchQuery && <Redirect to="/"/> }
//               </Route>
              
//               {/* Rendering SubResults component based on every unique path */}
//               <Route path={["/people/:peopleID/", "/films/:filmsID/", "/planets/:planetsID/"]}  component={ SubResults } >
//                 { !this.state.searchQuery && <Redirect to="/"/> }
//               </Route>
//             </Suspense>
//           </Router>
//         </Container>
//       </ThemeProvider>
//     );
//   };
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);