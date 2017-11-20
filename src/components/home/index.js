import React, { Component } from 'react';


import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
      <div className="m-3">
        <h1> Redux Boilerplate </h1>
        <hr />
        <p> Standard react and redux based boilerplate code for use in projects across KLL. Includes:</p>
        <ol>
          <li>Webpack, with seperate build configs for Dev and Prod</li>
          <li>Eslint Configuration</li>
          <li>Material UI</li>
          <li>Webfont Loader</li>
          <li>React GA</li>
          <li>Bootstrap</li>
          <li>Procfile and deployment configs for Heroku</li>
        </ol>

      </div>
    );
  }
}


export default Home;
