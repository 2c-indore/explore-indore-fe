import React, { Component } from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';

import './index.scss';
import './index.less';

import Amenity from './views/amenity';
import Edit from './views/edit';
import About from './views/about';
import Nav from './views/common/nav';

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
    <div>404</div>
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
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" render={() => { return <About />; }} />
            <Route exact path="/amenities/:amenity" component={Amenity} />
            <Route exact path="/edit" component={Edit} />
            <Route exact path="/about" component={About} />
            <Route exact path="/share/:initState" component={Amenity} />
            <Route component={FallBack} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}


export default Root;
