import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';


import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className="home m-3 row m-0">
        <div className="container">
          <div className="col-md-6 offset-md-3 text-center">

            <h1><b>Explore</b> Pokhara</h1>
            <h5>Bringing data, people and technology together.</h5>

            <img src="/assets/home.png" alt="Screenshots of the web and mobile version" className="img-fluid" />
            <p>
            Do you know where the closest hospital is from your home? Do you know
            where you can easily access cash during an emergency situation?
            Are you prepared!
            </p>

            <p>
            Prepare Pokhara app is the answer to these questions and more. Kathmandu Living Labs,
            the local partner of the Secondary Cities initiative, has been spearheading the ground effort to
             produce robust geospatial data for Pokhara for the past one and a half years.
             It is hoped that the critical infrastructure information made open here plays an integral part
             in keeping both yourself and your neighbors safe.
            </p>

            <RaisedButton primary label="Get Started" />

          </div>
        </div>
      </div>
    );
  }
}


export default Home;
