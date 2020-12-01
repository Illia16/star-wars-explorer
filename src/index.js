import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Importing contexts
import LoadingProvider from './Components/smart/Loading/LoadingContext';
import ErrorProvider from './Components/smart/Error/ErrorContext';
import UserInputProvider from './Components/smart/UserInput/UserInputContext';

ReactDOM.render(
  <React.StrictMode>
    <UserInputProvider>
      <LoadingProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </LoadingProvider>
    </UserInputProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
