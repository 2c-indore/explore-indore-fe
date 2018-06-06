import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import qs from 'qs';
import objectWalk from 'object-walk';
import cloneDeep from 'lodash.clonedeep';
import ReactLoading from 'react-loading';
import { Steps } from 'intro.js-react';
import { initializeView, updateView, updateState, updateType, downloadData, saveEditState } from '../../state/amenity';
import Filters from './filters';
import Insights from './insights';
import Map from './map';

import './styles.scss';
import './introjs.scss';

const steps = [
  {
    element: '.hamburger',
    intro: 'You can choose an amenity of your choice from the menu provided.',
    position: 'right',
    disableInteraction: true,
  },
  {
    element: '.currentAmenity',
    position: 'left',
    intro: 'The title will reflect the amenity you select.',
    disableInteraction: true,
  },
  {
    element: '.map',
    position: 'top',
    intro: 'Choosing an amenity will cause the map to populate those amenities within Pokhara',
    disableInteraction: true,
  },
  {
    element: '.insights',
    intro: 'View statistics for that amenity in the insights section.',
    position: 'right',
    disableInteraction: true,

  },
  {
    element: '.filters',
    intro: 'Play around with the data using controls provided in the filter section ',
    position: 'right',
    disableInteraction: true,

  },

  {
    element: '.shareButton',
    intro: 'Found an interesting insight? You can also share your results using the share button.',
    position: 'right',
    disableInteraction: true,

  },
];


class Amenity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      isHelpOpen: false,
    };


    this.onFilterChange = this.onFilterChange.bind(this);
    this.onExit = this.onExit.bind(this);
    this.onDownloadClick = this.onDownloadClick.bind(this);
    this.onUpdateDimensions = this.onUpdateDimensions.bind(this);
  }


  componentWillMount() {
    window.addEventListener('resize', this.onUpdateDimensions);
    this.onLoadView();
    const maxWindowHeight = Math.min(document.documentElement.clientHeight, window.innerHeight || 0) - 70;
    this.setState({ height: maxWindowHeight });
  }

  componentDidMount() {
  }

  // shouldComponentUpdate() {}

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.amenity.state,
    });
    // }
  }

  onUpdateDimensions() {
    const maxWindowHeight = Math.min(document.documentElement.clientHeight, window.innerHeight || 0) - 70;
    this.setState({
      height: maxWindowHeight,
    });
  }


  onFilterChange(parameterName,value) { //eslint-disable-line

    const stateClone = cloneDeep(this.state);

    delete stateClone.isDialogOpen;
    delete stateClone.height;

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
    delete stateClone.height;

    this.props.downloadData({ ...stateClone, type: this.props.amenity.type });
  }

  onExit() {
    this.setState({
      isHelpOpen: false,
    });
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
          <div style={{
             position: 'absolute', zIndex: '1000000000000000', top: '13px', right: '100px',
            }}
          >
            <FlatButton label="how to use" onClick={() => this.setState((oldState) => { return { isHelpOpen: true }; })} />
          </div>
          <Steps
            enabled={this.state.isHelpOpen}
            steps={steps}
            initialStep={0}
            onExit={this.onExit}
          />


          <div className="col-md-9 p-0 map">
            {geometries.success === 1 && <Map
              saveEditState={this.props.saveEditState}
              stateBeforeEdit={this.props.amenity.stateBeforeEdit}
              geometries={geometries}
              height={`${this.state.height}`}
              type={this.props.amenity.type}
              onDownload={this.onDownloadClick}
            />}
            {geometries.success === 0 &&
              <div
                style={{
                minHeight: this.state.height,
                maxHeight: this.state.height,
                minWidth: '100%',
                backgroundColor: '#000',
                color: '#fff',
                width: '100%',
              }}
                className="d-flex flex-column align-items-center p-5"
              >Updating map, please wait...<br /> <ReactLoading type="bars" color="#3590F3" />
              </div>
                                       }
          </div>
          <div className="col-md-3 p-0 controls" style={{ minHeight: this.state.height, maxHeight: this.state.height }}>
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
          {geometries.success === 1 && geometries.data.pois.features.length === 0 && <Snackbar
            open
            message="Sorry, there were no results for the filters applied."
            autoHideDuration={3000}
          />}
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
  initializeView, updateView, updateState, updateType, downloadData, saveEditState,
})((Amenity)));
