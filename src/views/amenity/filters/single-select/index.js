import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import shortid from 'shortid';

import './styles.scss';

class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e, i, newValue) {
    this.props.onChange(this.props.config.parameter_name, newValue);
  }

  toTitleCase(str) { //eslint-disable-line
    return str.replace(
      /\w\S*/g,
      (txt) => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      } //eslint-disable-line
    );
  }


  render() {
    // console.log(this.props);
    const { config, currentState } = this.props;
    // console.log('config', config, currentState);
    return (
      <div className="single-select">
        <p className="filter-label">{config.label}</p>
        <SelectField
          // errorText=" "
          // errorStyle={{ color: '#3590f3' }}
          iconStyle={{ fill: '#3590f3' }}
          fullWidth
          maxHeight={300}
          onChange={this.onChange}
          value={currentState[config.parameter_name]}
        >
          {config.options.map((item) => {
          return <MenuItem key={shortid.generate()} value={item.value} primaryText={this.toTitleCase(item.label)} />;
        })}
        </SelectField>
      </div>
    );
  }
}

export default SingleSelect;
