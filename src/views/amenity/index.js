import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import qs from 'qs';
import objectWalk from 'object-walk';
import cloneDeep from 'lodash.clonedeep';
import ReactLoading from 'react-loading';
import { initializeView, updateView, updateState, updateType, downloadData } from '../../state/amenity';
import Filters from './filters';
import Insights from './insights';
import Map from './map';


import './styles.scss';


class Amenity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
    };


    this.onFilterChange = this.onFilterChange.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
  }


  componentWillMount() {
    // initializeView()
    this.onLoadView();
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    // if (nextProps.match.params.amenity !== this.props.match.params.amenity) {
    this.setState({
      ...nextProps.amenity.state,
    });
    // }
  }


  // shouldComponentUpdate(nextProps, nextState) {
  //   return true;
  //   // nextProps.match.params.amenity !== this.props.match.params.amenity;
  // }


  onFilterChange(parameterName,value) { //eslint-disable-line

    const stateClone = cloneDeep(this.state);

    delete stateClone.isDialogOpen;

    this.props.updateView({ ...stateClone, [parameterName]: value, type: this.props.amenity.type });
    this.props.updateState({ ...stateClone, [parameterName]: value });
    // do something
    this.setState({
      [parameterName]: value,
    });
  }

  onDownloadClick() {
    this.setState({
      isDialogOpen: true,
    });
    // console.log({ ...this.state, type: this.props.amenity.type });
    const stateClone = cloneDeep(this.state);

    delete stateClone.isDialogOpen;

    this.props.downloadData({ ...stateClone, type: this.props.amenity.type });
  }

  onLoadView() {
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
          obj[prop] = true; //eslint-disable-line
        }

        if (obj[prop] === 'false') {
          obj[prop] = false; //eslint-disable-line
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

  render() {
    const {
      insights, parameters, geometries, loading, downloads,
    } = this.props.amenity;

    const actions = [

      <FlatButton
        label="close"
        primary
        onClick={() => { this.setState({ isDialogOpen: false }); }}
      />,
    ];

    // const { amenity } = this.props.match.params;
    if (!loading) {
      return (
        <div className="amenity row m-0">
          <div className="col-md-9 p-0 map">
            <Map geometries={geometries} type={this.props.amenity.type} onDownload={this.onDownloadClick} />
          </div>
          <div className="col-md-3 p-0 controls">
            <Insights type={this.props.amenity.type} currentState={this.props.amenity.state} insights={insights} />
            <Filters parameters={parameters} currentState={this.props.amenity.state} onChange={this.onFilterChange} />
          </div>
          <Dialog actions={actions} open={this.state.isDialogOpen} onRequestClose={() => { this.setState({ isDialogOpen: false }); }} title="Download Data" >
            {downloads.success === 0 &&
            <div className="m-0"> Please wait, generating download links.. <br /> <br />  <ReactLoading type="bars" color="#3590F3" /></div>}
            {downloads.success === 1 &&

              <div>
                <p>Please use the links below to download data in the format that you want:</p>
                <br />
                <a href={`http://preparepokhara.org/${downloads.data.csvlink}`} target="_blank">Download as CSV</a> <br />
                <a href={`http://preparepokhara.org/${downloads.data.geojsonlink}`} target="_blank">Download as GeoJSON</a> <br />
              </div>
            }
          </Dialog>
        </div>
      );
    } else {
      return <div className="d-flex justify-content-center m-5"> <ReactLoading type="bars" color="#3590F3" /></div>;
    }
  }
}

const mapStateToProps = state => ({
  amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  initializeView, updateView, updateState, updateType, downloadData,
})((Amenity)));
