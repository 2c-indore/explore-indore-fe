import React, { Component } from 'react';
import { withRouter,
  // , NavLink
} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import validator from 'validator';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { authenticateUser } from '../../state/amenity';
import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
      email: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onChange(e) {
    // console.log(e, e.target);

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onClickLogin() {
    const errors = {};

    // console.log(validator)

    if (validator.isEmpty(this.state.email)) {
      errors.email = 'This field cannot be empty. ';
    } else { //eslint-disable-line
      if (errors.email) { delete errors.email; }  //eslint-disable-line
    }

    if (!validator.isEmail(this.state.email)) {
      errors.email = 'This is not a valid email';
    } else { //eslint-disable-line
      if (errors.email) { delete errors.email; }  //eslint-disable-line
    }


    if (validator.isEmpty(this.state.password)) {
      errors.password = 'This field cannot be empty. ';
    } else { //eslint-disable-line
      if (errors.password) { delete errors.password; }  //eslint-disable-line
    }


    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        isLoggingIn: true,
      });
      // console.log('Cleared for login', this.props);
      this.props.authenticateUser({ email: this.state.email, password: this.state.password }, this.props.history);
    }
  }

  render() {
    return (
      <div className="row py-5 m-0">
        <div className="col-md-4 offset-md-4 p-5 text-center" style={{ border: '1px solid #e5e5e5', borderRadius: '15px' }}>
          <h3>Login</h3>

          {!this.state.isLoggingIn &&
            <div>
              <p>Please provide us with your credentials</p>
              <br />
              <TextField
                hintText="Enter your email"
                type="text"
                name="email"
                errorText={this.state.errors.email ? this.state.errors.email : null}

                value={this.state.email}
                onChange={this.onChange}
                fullWidth
              />
              <TextField
                hintText="Enter your password"
                value={this.state.password}
                errorText={this.state.errors.password ? this.state.errors.password : null}
                type="password"
                name="password"
                onChange={this.onChange}
                fullWidth
              />
              <br />
              <br />
              <RaisedButton onClick={this.onClickLogin} label="Login" primary fullWidth />
            </div>}

          {this.state.isLoggingIn &&
            <div>
              <br />
              <p>Please wait while we log you in.</p>
              <div className="d-flex justify-content-center">

                <ReactLoading type="bars" color="#3590f3" />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  authenticateUser,
})((Login)));

// export default withRouter(Login);
