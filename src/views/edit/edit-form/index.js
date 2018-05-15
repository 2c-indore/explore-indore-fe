import React, { Component } from 'react';
import shortid from 'shortid';
import TextField from 'material-ui/TextField';
import cloneDeep from 'lodash.clonedeep';


import RaisedButton from 'material-ui/RaisedButton';
import { tagMapper } from '../../../static/map-utils';


// import './styles.scss';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      changesetComment: '#kll',
    };

    this.onTextFieldChange = this.onTextFieldChange.bind(this);
    this.checkForDisabled = this.checkForDisabled.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    const { tags } = this.props.data.properties;
    Object.keys(tags).forEach((item) => {
      this.setState({
        [item]: tags[item],
      });
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


  onSubmit() {
    console.log(this.state);

    const stateClone = cloneDeep(this.state);
    delete stateClone.changesetComment;
    delete stateClone.disabled;
    const finalObj = { data: stateClone, changesetComment: this.state.changesetComment };

    console.log(finalObj);
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
          <RaisedButton disabled={this.state.disabled} className="my-2 " label="Submit changes" fullWidth primary onClick={this.onSubmit} />
        </div>
      </div>
    );
  }
}

export default EditForm;
