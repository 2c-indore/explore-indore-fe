import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import cloneDeep from 'lodash.clonedeep';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import ConfirmationDialog from '../../common/confirmation-dialog';

import { tagMapper } from '../../../static/map-utils';

import OsmAuth from './utils/OAuth';

import './styles.scss';

const auth = new OsmAuth();

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      changesetComment: '#preparepokhara ',
      isConfirmationOpen: false,
      isDataSubmitted: false,
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.checkForDisabled = this.checkForDisabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBeforeSubmit = this.onBeforeSubmit.bind(this);
    this.osmLogin = this.osmLogin.bind(this);
    this.osmLogout = this.osmLogout.bind(this);
  }

  componentWillMount() {
    const { tags } = this.props.data.properties;
    Object.keys(tags).forEach((item) => {
      this.setState({
        [item]: tags[item],
      });
    });

    // set Amenity type and its Id on state variables
    this.setState({
      amenityType: this.props.data.properties.type,
      amenityId: this.props.data.properties.id,
    });

    if (auth.isLoggedIn()) {
      this.osmLogin();
    } else {
      this.setState({
        loggedInUser: null,
      });
    }

    const filteredState = {};
    tagMapper[this.props.type].forEach((item) => {
      filteredState[item.keyName] = tags[item.keyName];
    });

    this.filteredState = filteredState;
  }


  osmLogin() {
    auth.login()
      .then((userDetails) => {
        this.setState({
          loggedInUser: userDetails.osm.user['0'].$
        });
      })
      .catch((err) => {
        throw err;
      });
  }

  osmLogout() {
    auth.logout();
    this.setState({
      loggedInUser: null,
    });
  }

  checkForDisabled(type, item) { //eslint-disable-line
    const subset = tagMapper[type].filter((tag) => {
      return tag.keyName === item;
    });

    if (subset.length === 0) {
      return true;
    } else {
      return subset[0].isEditable === 'FALSE';
    }
  }


  onTextFieldChange(e, newValue) {
    this.setState({
      [e.target.name]: newValue,
      disabled: false,
    });
  }

  onBeforeSubmit(isTrue) {
    this.setState((oldState) => {
      return {
        isConfirmationOpen: !oldState.isConfirmationOpen,
      };
    });

    if (isTrue !== undefined) {
      if (isTrue) {
        this.onSubmit();
      }
    }
  }


  onSubmit() {
    // console.log(this.state);
    const stateClone = cloneDeep(this.state);

    delete stateClone.changesetComment;
    delete stateClone.disabled;
    delete stateClone.amenityId;
    delete stateClone.amenityType;
    delete stateClone.isConfirmationOpen;
    delete stateClone.isDataSubmitted;
    delete stateClone.loggedInUser;

    const finalObj = {
      amenityId: this.state.amenityId, amenityType: this.state.amenityType, data: stateClone, changesetComment: this.state.changesetComment,
    };
    console.log(finalObj);

    // code to call the OSM API for editing.
    auth.getFeature(finalObj.amenityType, finalObj.amenityId)
      .then((response) => {
        const cleanedResponse = auth.cleanseData(response, finalObj.amenityType);
        const appliedChanges = auth.applyChanges(finalObj.data, cleanedResponse, finalObj.amenityType);
        return auth.createChangeset(appliedChanges, finalObj.changesetComment);
      })
      .then((response) => {
        const xml = auth.applyChangeset(response.changeset, response.appliedChanges, finalObj.amenityType);
        return auth.applyEdit(xml, finalObj.amenityType, finalObj.amenityId);
      })
      .then((edited) => {
        this.setState({
          isDataSubmitted: true,
          disabled: true,
        });
        this.osmLogin();
        // alert('');
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const loggedInStateText = this.state.loggedInUser == null ? 'You are not logged in to OSM currently.' : `You are logged in as ${this.state.loggedInUser.display_name}.`;
    const loggedInStateLinkText = this.state.loggedInUser == null ? 'Click here to login' : 'Click here to logout';
    const loggedInStateAction = this.state.loggedInUser == null ? this.osmLogin : this.osmLogout;
    return (
      <div style={{ minHeight: '90vh', maxHeight: '90vh', overflowY: 'auto' }}>
        {
          this.state.loggedInUser !== undefined &&
          <div>
            <br />
            <span className="light-text "> { loggedInStateText }
              <span>
                <span style={{ cursor: 'pointer' }} onClick={loggedInStateAction}> <b> { loggedInStateLinkText } </b> </span>
              </span>
            </span>
          </div>
        }
        <div >
          {Object.keys(this.filteredState).map((item) => {
            const label = tagMapper[this.props.type].filter((tag) => { return tag.keyName === item; })[0].keyLabel;
          const hint = tagMapper[this.props.type].filter((tag) => { return tag.keyName === item; })[0].helpText;
          if (item !== 'changesetComment' && item !== 'disabled') {
          return (
            <div>
              <i className="fas float-right help-icon fa-question-circle" title={hint === '' ? 'No description available' : hint} />
              <TextField
                key={item}
                disabled={this.checkForDisabled(this.props.type, item)}
                onChange={this.onTextFieldChange}
                name={item}
                value={this.state[item]}
                fullWidth
                // errorText={hint}
                floatingLabelText={label === '-' ? 'amenity' : label}
                floatingLabelStyle={{ color: '#888' }}
              />
            </div>
        );
        } else {
          return null;
        }
      })}
          <TextField onChange={this.onTextFieldChange} name="changesetComment" value={this.state.changesetComment} fullWidth floatingLabelText="Comments (if any)" />
        </div>
        <div className="pr-2">
          <RaisedButton disabled={this.state.disabled} className="my-2 " label="Submit changes" fullWidth primary onClick={() => this.onBeforeSubmit()} />
          <ConfirmationDialog
            title="Confirm data submission"
            message="Are you sure you want to upload these changes to OpenStreetMap?"
            open={this.state.isConfirmationOpen}
            handleRequest={this.onBeforeSubmit}
          />
          <Snackbar
            open={this.state.isDataSubmitted}
            message="Successfully edited OSM data! Your change will be visible in the next two hours."
            autoHideDuration={4000}
            onRequestClose={() => { this.setState({ isDataSubmitted: false }); }}
          />
        </div>
      </div>
    );
  }
}

export default EditForm;
