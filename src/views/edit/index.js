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

          <div className="col-md-3 pl-2 pr-0">
            <EditForm data={amenityData} type={type} />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Edit;
