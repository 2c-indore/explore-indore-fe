import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';

import '../../index.scss';
import '../../index.less';

import Home from '../home';

//
ReactGA.initialize('MUHAJAHSG');
const history = createHistory();
history.listen((location, action) => {
  ReactGA.set({ page: location.hash.substring(1) });
  ReactGA.pageview(location.hash.substring(1));
});
//
//
const FallBack = (props) => {
  return (
    <div>Not Found</div>
  );
};


class Root extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <HashRouter history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route component={FallBack} />
        </Switch>
      </HashRouter>
    );
  }
}


export default Root;
