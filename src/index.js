import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from './store/store';

import { MuiThemeProvider as Theme, createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red['700']
    }
  }
})

ReactDOM.render(

  <BrowserRouter>
    <Provider store={ Store }>
      <Theme theme={ theme }>
        <App />
      </Theme>
    </Provider>
  </BrowserRouter>

  ,

  document.getElementById('root')

);

registerServiceWorker();
