import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import qs from 'qs';
import objectWalk from 'object-walk';
import cloneDeep from 'lodash.clonedeep';
import { initializeView, updateView, updateState, updateType } from '../../state/amenity';
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
    if (this.props.match.params.amenity) {
      this.props.initializeView(this.props.match.params.amenity);
    } else {
      // console.log(this.props.match.params.initState);
      const { initState } = this.props.match.params;
      // console.log('inside share view');
      const stateObj = qs.parse(window.atob(initState));

      // console.log(stateObj);

      const descentionFn = (val, prop, obj) => {
        // console.log('val', val, 'prop', prop, 'obj', obj);
        if (obj[prop] === 'true') {
          obj[prop] = true;
        }

        if (obj[prop] === 'false') {
          obj[prop] = false;
        }
      };

      objectWalk(stateObj, descentionFn);

      this.props.initializeView(stateObj.type);


      setTimeout(() => {
        const stateObjCopy = cloneDeep(stateObj);
        delete stateObjCopy.type;
        this.props.updateState({ ...stateObjCopy });
        this.props.updateView({ ...stateObj });
      }, 3000);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.amenity.state,
    });
  }

  onFilterChange(parameterName,value) { //eslint-disable-line

    this.props.updateView({ ...this.state, [parameterName]: value, type: this.props.amenity.type });
    this.props.updateState({ ...this.state, [parameterName]: value });
    // do something
    this.setState({
      [parameterName]: value,
    });
  }

  render() {
    const {
      insights, parameters, geometries, loading,
    } = this.props.amenity;

    // const { amenity } = this.props.match.params;
    if (!loading) {
      return (
        <div className="amenity row m-0">
          <div className="col-md-9 p-0 map">
            <Map geometries={geometries} type={this.props.amenity.type} />
          </div>
          <div className="col-md-3 p-0 controls">
            <Insights type={this.props.amenity.type} currentState={this.props.amenity.state} insights={insights} />
            <Filters parameters={parameters} currentState={this.props.amenity.state} onChange={this.onFilterChange} />
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

const mapStateToProps = state => ({
  amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  initializeView, updateView, updateState, updateType,
})((Amenity)));
