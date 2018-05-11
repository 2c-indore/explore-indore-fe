import React, { Component } from 'react';
import c3 from 'c3';
import './styles.scss';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount() {
    this.updateChart();
  }

  componentDidUpdate() {

  }

  updateChart() {
    c3.generate({
      bindto: this.node,
      data: {
        json: { value: this.props.value },
        type: 'bar',
      },
      axis: {
        rotated: true,
        x: {
          show: false,
          type: 'category',
        },
        y: {
          show: false,
          max: 90,
        },
      },
      color: {
        pattern: ['#fff'],
      },
      legend: {
        show: false,
      },
      padding: {
        right: 10,
      },
      regions: [
        // {axis: 'y', end: 1, class: 'regionY'},
        {
          axis: 'x', start: -0.32, end: 0.3, class: 'region1',
        },
      ],
      bar: {
        width: {
          ratio: 0.5, // this makes bar width 50% of length between ticks
        },
        // or
        // width: 100 // this makes bar width 100px
      },
      size: {
        height: 30,
      },
      tooltip: {
        show: false,
      },
    });
  }


  render() {
    return (
      <div
        className="chart"
        ref={node => this.node = node} //eslint-disable-line
      />
    );
  }
}

export default Chart;
