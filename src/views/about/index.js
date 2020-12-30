import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';


import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <div className="about p-5 row m-0">
        <div className="col-lg-6 my-3">

          <h2><b>Explore</b> Indore</h2>
          <h5>Bringing data, people and technology together.</h5>
          <br />

          <NavLink to="/amenities/public_hospitals"><RaisedButton primary label="Get Started →" /></NavLink>


          <br />
          <br />
          <br />


          <h5>About the project</h5>
          <p className="light-text ">
            Do you know where the closest hospital is from your home? Do you know
            where you can easily access an ambulance from during an emergency situation?
            Are you prepared?
          </p>

          <p className="light-text ">
            Explore Indore app is the answer to these questions and more. Acropolis Institute of Technology and Research,
            the local partner of the Secondary Cities initiative, with help from Kathmandu Living Labs, has been spearheading the ground effort to
             produce robust geospatial data for Indore for the past one and a half years.
             It is hoped that the critical infrastructure information made open here plays an integral part
             in keeping both yourself and your neighbors safe.
          </p>

          <p className="light-text">A print-friendly, paper-based version of this app is also available as <a href="https://drive.google.com/file/d/1duriBd8g411UPrvkym8O76Oe2d5vUwoz/view?usp=sharing" target="_blank" rel="noopener noreferrer">The Indore Map Book</a>. Also, try our Explore Indore app on the play store<br />
            <a href="https://play.google.com/store/apps/details?id=org.kathmandulivinglabs.exploreindore"><img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" width="150" height="60" alt="Get it on Google Play" border="0" style={{ marginLeft: '-10px' }} /></a>
          </p>
          <p className="light-text" />


          <br />


        </div>
        <div className="col-lg-6 px-4 hidden-md-down">
          <img src="/assets/home.png" width="70%" alt="Screenshots of the web app" className="img-fluid float-right" />
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a href="http://www.acropolis.in/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/acropolis.png" style={{ maxWidth: '150px' }} alt="Screenshots of the web and mobile version" className="img-fluid pr-5" />
          </a>
          <br />

          <p className="light-text">
          Acropolis Institute of Technology and Research <br />
          Indore, Madhya Pradesh, India<br />
            <a target="_blank" rel="noopener noreferrer" href="http://www.acropolis.in/">www.acropolis.in</a><br />
          </p>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a href="http://kathmandulivinglabs.org" target="_blank" rel="noopener noreferrer">
            <img src="/assets/kll_logo.png" style={{ maxWidth: '300px' }} alt="Screenshots of the web and mobile version" className="img-fluid pr-5 " />
          </a>
          <br />
          <p className="light-text">
        Kathmandu Living Labs <br />
        1474, Lamtangin Marga <br />
        Chundevi, Kathmandu, Nepal <br />
        contact@kathmandulivinglabs.org<br />
            <a target="_blank" rel="noopener noreferrer" href="http://kathmandulivinglabs.org">kathmandulivinglabs.org</a><br />
          </p>
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a href="https://secondarycities.state.gov/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/2c_logo.png" style={{ maxWidth: '300px' }} alt="Screenshots of the web and mobile version" className="img-fluid pr-5" />
          </a>
          <br />

          <p className="light-text">
          Humanitarian Information Unit <br />
          US Department of State<br />
          American Red Cross Building 2025 E St. NW<br />
          hiu_info@state.gov<br />
            <a target="_blank" rel="noopener noreferrer" href="https://secondarycities.state.gov/">secondarycities.state.gov</a><br />
          </p>
        </div>


      </div>
    );
  }
}


export default withRouter(About);
