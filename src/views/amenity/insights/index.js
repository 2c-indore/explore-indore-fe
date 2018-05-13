import React, { Component } from 'react';
import shortid from 'shortid';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Share from 'material-ui/svg-icons/social/share';
import IconButton from 'material-ui/IconButton';
import Chart from './chart';

import './styles.scss';

const InsightItem = ({ config }) => {
  const chartValue = ((Number(config.value) / Number(config.max_value)) * 100).toFixed(0);
  return (
    <div className="pt-3">
      <p className="insight-title" >{config.insight_title}</p>
      <div className="row">
        <div className="col-10">
          <Chart value={chartValue} />
        </div>
        <div className="col-2 percentage">
          {chartValue}%
        </div>
      </div>
      <p className="breakdown"><small>Currently showing: {config.value} of {config.max_value}</small></p>
    </div>
  );
};


class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {


    };

    this.onShareClick = this.onShareClick.bind(this);
  }

  onShareClick() {
    console.log(this.props.currentState);
  }

  render() {
    const { insights } = this.props;

    if (insights !== null && insights.success === 1) {
      const { data } = insights;
      return (
        <div className=" pt-4">
          <h5
            className=" px-3"
            style={{ marginBottom: '20px' }}
          >
            <Timeline style={{ marginBottom: '-5px' }} /> Insights
            <IconButton
              onClick={this.onShareClick}
              style={{ marginTop: '-10px' }}
              className="float-right"
            ><Share />
            </IconButton>
          </h5>

          <div className="insights p-3">
            {Object.keys(data).map((item) => {
            // console.log('item', item);
              return <InsightItem key={shortid.generate()} config={data[item]} />;
          })}
          </div>
        </div>);
    } else {
      return <div />;
    }
  }
}

export default Insights;
