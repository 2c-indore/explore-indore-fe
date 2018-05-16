import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// import './styles.scss';

class ConfirmationDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onClick={() => { this.props.handleRequest(false); }}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={() => { this.props.handleRequest(true); }}
      />,
    ];
    return (
      <Dialog
        title={this.props.title}
        open={this.props.open}
        actions={actions}
      >
        {this.props.message}
      </Dialog>);
  }
}

export default ConfirmationDialog;
