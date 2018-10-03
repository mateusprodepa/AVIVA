import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Store from './store/store';

import { MuiThemeProvider as Theme, createMuiTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

// import { socket } from './config/socket';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red['700']
    }
  }
})

// socket.emit('getRooms', 'RWGtJDq8x');
// socket.on('userRooms', (rooms) => console.info(rooms));


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
