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

          <h1><b>Prepare</b> Pokhara</h1>
          <h5>Bringing data, people and technology together.</h5>

          <br />
          <br />

          <p className="light-text ">
            Do you know where the closest hospital is from your home? Do you know
            where you can easily access cash during an emergency situation?
            Are you prepared?
          </p>

          <p className="light-text ">
            Prepare Pokhara app is the answer to these questions and more. Kathmandu Living Labs,
            the local partner of the Secondary Cities initiative, has been spearheading the ground effort to
             produce robust geospatial data for Pokhara for the past one and a half years.
             It is hoped that the critical infrastructure information made open here plays an integral part
             in keeping both yourself and your neighbors safe.
          </p>

          <br />

          <NavLink to="/amenities/hospital"><RaisedButton primary label="Get Started" /></NavLink>


        </div>
        <div className="col-lg-6 px-4 hidden-md-down">
          <img src="/assets/home.png" width="70%" alt="Screenshots of the web app" className="img-fluid float-right" />
        </div>

        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
          <a href="http://pokharalekhnathmun.gov.np/" target="_blank" rel="noopener noreferrer">
            <img src="/assets/gon_logo.png" style={{ maxWidth: '300px' }} alt="Screenshots of the web and mobile version" className="img-fluid pr-5" />
          </a>
          <br />

          <p className="light-text">
          Government of Nepal <br />
          Ministry of Federal Affairs and Local Development <br />
          Pokhara Lekhnath Metropolitan<br />
          New Road, Pokhara 9, Kaski<br />
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
        contact@kathmandulivinglabs.org
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
          hiu_info@state.gov
          </p>
        </div>


      </div>
    );
  }
}


export default withRouter(About);