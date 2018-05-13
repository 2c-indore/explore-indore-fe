import React, { Component } from 'react';
import shortid from 'shortid';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Dialog from 'material-ui/Dialog';
import Timeline from 'material-ui/svg-icons/action/timeline';
import Share from 'material-ui/svg-icons/social/share';
import IconButton from 'material-ui/IconButton';
import qs from 'qs';
import FlatButton from 'material-ui/FlatButton';
import fetchShortUrl from './shortener';
// import axios from 'axios';
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


const ShareDialog = ({ isDialogOpen, shareUrl, handleClose }) => {
  const actions = [
    <CopyToClipboard text={shareUrl}>
      <FlatButton primary label="Copy URL to clipboard" onClick={handleClose} />
    </CopyToClipboard>,
    <FlatButton
      label="Close"
      primary
      onClick={handleClose}
    />,
  ];
  return (
    <Dialog title="Share analysis" actions={actions} open={isDialogOpen}>
      <p>Found an interesting insight? Want to share analysis results with your friends and family? Now you can easily do so by using the link provided below</p>
      <div className="inline-block">
        <h2>{shareUrl}</h2>
      </div>
    </Dialog>
  );
};


class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shareUrl: '',
      isShareDialogOpen: false,
    };

    this.onShareClick = this.onShareClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  onShareClick() {
    // console.log((window.btoa(qs.stringify(this.props.currentState))));
    const enc = window.btoa(qs.stringify({ ...this.props.currentState, type: this.props.type }));
    fetchShortUrl(enc).then((response) => {
      // console.log(response.data.data.url);
      this.setState({
        isShareDialogOpen: true,
        shareUrl: response.data.data.url,
      });
    });
  }

  handleClose() {
    this.setState({
      isShareDialogOpen: false,
    });
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

          <ShareDialog isDialogOpen={this.state.isShareDialogOpen} shareUrl={this.state.shareUrl} handleClose={this.handleClose} />
        </div>);
    } else {
      return <div />;
    }
  }
}

export default Insights;
