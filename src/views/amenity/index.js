import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { initializeView, updateView, updateState } from '../../state/amenity';
import Filters from './filters';
import Insights from './insights';
import Map from './map';


import './styles.scss';

class Amenity extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentWillMount() {
    // initializeView()
    this.props.initializeView(this.props.match.params.amenity);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.amenity.state,
    });
  }

  onFilterChange(parameterName,value) { //eslint-disable-line
    console.log('changedState', { ...this.state, [parameterName]: value });
    this.props.updateView({ ...this.state, [parameterName]: value, type: this.props.match.params.amenity });
    this.props.updateState({ ...this.state, [parameterName]: value });
    // do something
    this.setState({
      [parameterName]: value,
    });
  }

  render() {
    const { insights, parameters, geometries } = this.props.amenity;

    // const { amenity } = this.props.match.params;
    return (
      <div className="amenity row m-0">
        <div className="col-md-9 p-0 map">
          <Map geometries={geometries} />
        </div>
        <div className="col-md-3 p-0 controls">
          <Insights insights={insights} />
          <Filters parameters={parameters} currentState={this.props.amenity.state} onChange={this.onFilterChange} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  initializeView, updateView, updateState,
})((Amenity)));
