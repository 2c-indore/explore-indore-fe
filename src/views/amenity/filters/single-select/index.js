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

  render() {
    // console.log(this.props);
    const { config, currentState } = this.props;
    return (
      <div className="single-select">
        <p className="filter-label">{config.label}</p>
        <SelectField
          fullWidth
          onChange={this.onChange}
          value={currentState[config.parameter_name]}
        >
          {config.options.map((item) => {
          return <MenuItem key={shortid.generate()} value={item.value} primaryText={item.label} />;
        })}
        </SelectField>
      </div>
    );
  }
}

export default SingleSelect;
