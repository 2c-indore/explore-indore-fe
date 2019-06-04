import React, { Component } from 'react';
import { withRouter,
  // , NavLink
} from 'react-router-dom';
import Snackbar from 'material-ui/Snackbar';

import { connect } from 'react-redux';
import { closeNotif } from '../../../state/amenity';
import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // open: props.open,
    };

    // this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.amenity.notif.message === this.props.amenity.notif.message) {
      return false;
    }
    return true;
  }

  handleRequestClose() {
    this.props.closeNotif();
    // this.setState({
    //   open: false,
    // });
  }

  render() {
    return (
      <Snackbar
        // open={this.state.open}
        open={this.props.amenity.notif.isOpen}
        autoHideDuration={3000}
        // action="close"

        message={this.props.amenity.notif.message}
        // onActionClick={this.handleRequestClose}
      />

    );
  }
}

const mapStateToProps = state => ({
  amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  closeNotif,
})((Notification)));

// export default withRouter(Notification);
