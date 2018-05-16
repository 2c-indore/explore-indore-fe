import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import cloneDeep from 'lodash.clonedeep';
import RaisedButton from 'material-ui/RaisedButton';

import ConfirmationDialog from '../../common/confirmation-dialog';

import { tagMapper } from '../../../static/map-utils';

import OsmAuth from './utils/OAuth';

// import './styles.scss';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      changesetComment: '#preparepokhara ',
      isConfirmationOpen: false,
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.checkForDisabled = this.checkForDisabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onBeforeSubmit = this.onBeforeSubmit.bind(this);
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

    const filteredState = {};
    tagMapper[this.props.type].forEach((item) => {
      filteredState[item.keyName] = tags[item.keyName];
    });

    this.filteredState = filteredState;
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

    const finalObj = {
      amenityId: this.state.amenityId, amenityType: this.state.amenityType, data: stateClone, changesetComment: this.state.changesetComment,
    };
    console.log(finalObj);

    // code to call the OSM API for editing.
    const auth = new OsmAuth();
    auth.getFeature(finalObj.amenityType, finalObj.amenityId)
      .then((response) => {
        const cleanedResponse = auth.cleanseData(response, finalObj.amenityType);
        const appliedChanges = auth.applyChanges(finalObj.data, cleanedResponse, finalObj.amenityType);
        return auth.createChangeset(appliedChanges, finalObj.changeSetComment);
      })
      .then((response) => {
        const xml = auth.applyChangeset(response.changeset, response.appliedChanges, finalObj.amenityType);
        return auth.applyEdit(xml, finalObj.amenityType, finalObj.amenityId);
      })
      .then((edited) => {
        alert('Successfully edited !');
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    return (
      <div>

        <div style={{ minHeight: '85vh', maxHeight: '85vh', overflowY: 'auto' }}>
          {Object.keys(this.filteredState).map((item) => {
          if (item !== 'changesetComment' && item !== 'disabled') {
          return (
            <TextField
              key={item}
              disabled={this.checkForDisabled(this.props.type, item)}
              onChange={this.onTextFieldChange}
              name={item}
              value={this.state[item]}
              fullWidth
              floatingLabelText={item}
            />);
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
        </div>
      </div>
    );
  }
}

export default EditForm;
