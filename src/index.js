import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import WebFont from 'webfontloader';

import Root from './components/root';
import reducers from './reducers';

import './index.scss';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00bcd4',
  },
});

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

WebFont.load({
  google: {
    families: ['Noto Sans', 'Roboto:300,400,700', 'Source Sans Pro:600'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Root />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
