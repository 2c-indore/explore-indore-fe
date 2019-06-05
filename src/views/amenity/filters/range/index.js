import React, { Component } from 'react';
// import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import Slider from 'rc-slider';

// import 'react-input-range/lib/css/index.css';

import './styles.scss';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);


class RangeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.onChange = this.onChange.bind(this);
  }
  //
  componentWillMount() {
    const { config, currentState } = this.props;

    this.setState({
      minValue: Number(currentState[config.parameter_name].min),
      maxValue: Number(currentState[config.parameter_name].max),
    });
  }

  componentWillUpdate() {
    // console.log('update');
  }
  //
  onChange(newValue) {
    const { config } = this.props;
    // console.log(newValue, 'newValue');
    this.props.onChange(config.parameter_name, newValue);
  }

  render() {
    const { config, currentState } = this.props;
    // console.log('rangeconfig', config);
    const defaultValue = [Number(currentState[config.parameter_name].low), Number(currentState[config.parameter_name].high)];
    const marks = {
      [this.state.minValue]: this.state.minValue,
      [this.state.maxValue]: this.state.maxValue,
      // this.state.maxValue
    };

    if (defaultValue[0] > this.state.minValue + 99) {
      marks[defaultValue[0]] = defaultValue[0]; //eslint-disable-line
    }

    if (defaultValue[1] < this.state.maxValue - 99) {
      marks[defaultValue[1]] = defaultValue[1]; //eslint-disable-line
    }

    return (
      <div className="range ">
        <p className="filter-label">{config.label}</p>
        <div className="px-2">
          <Range
            onAfterChange={(newValue) => {
             this.onChange({
               max: this.state.maxValue,
               min: this.state.minValue,
               high: newValue[1],
               low: newValue[0],
            });
          }}
            min={this.state.minValue}
            max={this.state.maxValue}
            defaultValue={defaultValue}
            tipFormatter={value => `${value}`}
          // trackStyle={{ backgroundColor: 'red' }}
          // handle={handle}
            // step={Number(currentState[config.parameter_name].step)}
            marks={marks}
          />
        </div>
      </div>
    );
  }
}

export default RangeSlider;
