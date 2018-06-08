import React, { Component } from 'react';
import EditMap from './edit-map';
import EditForm from './edit-form';
// import './styles.scss';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    if (this.props.location.state) {
      // console.log(this.props.location.state.amenityData);
    }
  }

  render() {
    if (this.props.location.state) {
      const { amenityData, type } = this.props.location.state;
      return (
        <div className="row m-0">
          <div className="col-md-9 p-0">
            <EditMap data={amenityData} type={type} />
          </div>

          <div className="col-md-3 pl-0 pr-0">
            <EditForm data={amenityData} type={type} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="col-6 m-5 ">
          <br />
          <br />
          <img src="/assets/oops.png" alt="error" height="200" />
          <br />
          <br />
          <p className="pl-2 light-text">
          Looks like you refreshed your browser. The edit functionality is only accessible through the map-based view. Please press the back button.
          </p>
        </div>
      );
    }
  }
}

export default Edit;
