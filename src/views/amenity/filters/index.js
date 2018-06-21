import React, { Component } from 'react';
import shortid from 'shortid';
import FilterIcon from 'material-ui/svg-icons/content/filter-list';
import IconButton from 'material-ui/IconButton'
import Refresh from 'material-ui/svg-icons/navigation/refresh';

// import Paper from 'material-ui/Paper';
import SingleSelect from './single-select';
import MultiSelect from './multi-select';
import RangeSlider from './range';

// import './styles.scss';

const RenderFilter = ({ config, onChange, currentState }) => {
  switch (config.type) {
    case 'single-select':
      return <SingleSelect config={config} onChange={onChange} currentState={currentState} />;
    case 'multi-select':
      return <MultiSelect config={config} onChange={onChange} currentState={currentState} />;
    case 'range':
      return <RangeSlider config={config} onChange={onChange} currentState={currentState} />;
    default:
      return null;
  }
};


class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { parameters } = this.props;

    if (parameters !== null && parameters.success === 1) {
      const { data } = parameters;
      return (
        <div className="p-3 filters">
          <h5 className="mb-4">
            <b>Filters</b>
            <IconButton
              style={{ marginTop: '-10px' }}
              tooltip={<span style={{fontSize: '0.8rem'}}>Reset Filters</span>}
              tooltipStyles={{ backgroundColor: '#000' }}
              className="float-right resetButton"
              onClick={() => { this.props.onResetFilter(parameters); }}
            ><Refresh />
            </IconButton>
          </h5>
          <div style={{ backgroundColor: '#fff'}}>
            {Object.keys(data).map((item) => {
              return <RenderFilter key={shortid.generate()} config={data[item]} onChange={this.props.onChange} currentState={this.props.currentState} />;
            })}
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Filters;

// <div><pre>{JSON.stringify(this.props.parameters, null, 4)}</pre></div>









// <FilterIcon style={{ marginBottom: '-5px', marginRight: '7px' }} />
// Filters
