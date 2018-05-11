import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import shortid from 'shortid';
import './styles.scss';

class MultiSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(itemChanged, value) {
    const { config, currentState } = this.props;
    this.props.onChange(config.parameter_name, { ...currentState[config.parameter_name], [itemChanged]: value });
  }

  render() {
    const { config, currentState } = this.props;
    // console.log(config, currentState);
    return (
      <div className="multi-select">
        <p className="filter-label">{config.label}</p>
        {config.options.map((item) => {
          // console.log(item.value);
          return (<Toggle
            toggled={currentState[config.parameter_name][item.value]}
            onToggle={(e, value) => { this.onChange(item.value, value); }}
            key={shortid.generate()}
            label={item.label}
          />);
        })}
      </div>
    );
  }
}

export default MultiSelect;
