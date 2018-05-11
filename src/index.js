import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import WebFont from 'webfontloader';

import Routes from './routes';
import reducers from './global-reducers';

import './index.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#3590F3',
    accent1Color: '#3590F3',
  },
  appBar: {
    color: "#fff",
    textColor: "#333"
  },
  fontFamily: 'Roboto',
});

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

WebFont.load({
  google: {
    families: ['Noto+Sans:300,400,700,900', 'Roboto:300,400,700'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Routes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
