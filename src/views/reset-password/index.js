import React, { Component } from 'react';
import { withRouter,
  // , NavLink
} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import validator from 'validator';
// import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { resetPassword } from '../../state/amenity';
import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isResettingPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onClickResetPassword = this.onClickResetPassword.bind(this);
  }

  onChange(e) {
    // console.log(e, e.target);

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onClickResetPassword() {
    const errors = {};

    // console.log(validator)

    if (validator.isEmpty(this.state.oldPassword)) {
      errors.oldPassword = 'This field cannot be empty. ';
    } else { //eslint-disable-line
      if (errors.oldPassword) { delete errors.oldPassword; }  //eslint-disable-line
    }


    if (validator.isEmpty(this.state.newPassword)) {
      errors.newPassword = 'This field cannot be empty. ';
    } else { //eslint-disable-line
      if (errors.newPassword) { delete errors.newPassword; }  //eslint-disable-line
    }


    // if (validator.isEmpty(this.state.confirmNewPassword)) {
    //   errors.confirmNewPassword = 'This field cannot be empty. ';
    // } else { //eslint-disable-line
    //   // if (errors.confirmNewPassword) { delete errors.confirmNewPassword; }  //eslint-disable-line
    // }


    if (this.state.newPassword !== this.state.confirmNewPassword) {
      errors.confirmNewPassword = 'The passwords do not match.';
    } else { //eslint-disable-line
      if (errors.confirmNewPassword) { delete errors.confirmNewPassword; }  //eslint-disable-line
    }


    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        // isResettingPassword: true,
      });
      // console.log('Cleared for reset', this.props);
      this.props.resetPassword({ oldpassword: this.state.oldPassword, newpassword: this.state.confirmNewPassword }, this.props.history);
    }
  }

  render() {
    return (
      <div className="row py-5 m-0">
        <div className="col-lg-4 offset-lg-4 col-md-6 offset-md-3 p-5 text-center" style={{ border: '1px solid #e5e5e5', borderRadius: '15px' }}>
          <h3>Reset Password</h3>

          {
            <div>
              <p>Please enter details below</p>
              <br />
              <TextField
                hintText="Old password"
                type="password"
                name="oldPassword"
                errorText={this.state.errors.oldPassword ? this.state.errors.oldPassword : null}

                value={this.state.oldPassword}
                onChange={this.onChange}
                fullWidth
              />


              <TextField
                hintText="New password"
                type="password"
                name="newPassword"
                errorText={this.state.errors.newPassword ? this.state.errors.newPassword : null}

                value={this.state.newPassword}
                onChange={this.onChange}
                fullWidth
              />


              <TextField
                hintText="Re-enter new password"
                type="password"
                name="confirmNewPassword"
                errorText={this.state.errors.confirmNewPassword ? this.state.errors.confirmNewPassword : null}

                value={this.state.confirmNewPassword}
                onChange={this.onChange}
                fullWidth
              />


              <br />
              <br />
              <RaisedButton onClick={this.onClickResetPassword} label="Reset Password" primary fullWidth />
            </div>}

          {/* this.state.isResettingPassword &&
            <div>
              <br />
              <p>Please wait while we reset your password.</p>
              <div className="d-flex justify-content-center">

                <ReactLoading type="bars" color="#3590f3" />
              </div>
            </div>
          */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  resetPassword,
})((ResetPassword)));

// export default withRouter(ResetPassword);
