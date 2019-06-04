import React, { Component } from 'react';
import { withRouter,
  // , NavLink
} from 'react-router-dom';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import validator from 'validator';
import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { addNewUser } from '../../state/amenity';
import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';


class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddingUser: false,
      name: '',
      email: '',
      confirmEmail: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onClickAddUser = this.onClickAddUser.bind(this);
  }

  onChange(e) {
    // console.log(e, e.target);

    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onClickAddUser() {
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

    if (!validator.isEmail(this.state.confirmEmail)) {
      errors.confirmEmail = 'This is not a valid email';
    } else { //eslint-disable-line
      if (errors.confirmEmail) { delete errors.confirmEmail; }  //eslint-disable-line
    }


    if (this.state.email !== this.state.confirmEmail) {
      errors.confirmEmail = 'The email addresses you entered do not match. ';
    } else { //eslint-disable-line
      if (errors.confirmEmail) { delete errors.confirmEmail; }  //eslint-disable-line
    }

    if (Object.keys(errors).length > 0) {
      this.setState({
        errors,
      });
    } else {
      this.setState({
        isAddingUser: true,
      });
      // console.log('Cleared for login', this.props);
      this.props.addNewUser({ email: this.state.email, name: this.state.name }, this.props.history);
    }
  }

  render() {
    return (
      <div className="row py-5 m-0">
        <div className="col-4 offset-4 col-md-6 offset-md-3 p-5 text-center" style={{ border: '1px solid #e5e5e5', borderRadius: '15px' }}>
          <h3>Add new user</h3>

          {!this.state.isAddingUser &&
            <div>
              <p>Please enter details below</p>
              <br />
              <TextField
                hintText="Enter name"
                type="text"
                name="name"
                errorText={this.state.errors.name ? this.state.errors.name : null}

                value={this.state.name}
                onChange={this.onChange}
                fullWidth
              />


              <TextField
                hintText="Enter email"
                type="text"
                name="email"
                errorText={this.state.errors.email ? this.state.errors.email : null}

                value={this.state.email}
                onChange={this.onChange}
                fullWidth
              />


              <TextField
                hintText="Re-enter email"
                type="text"
                name="confirmEmail"
                errorText={this.state.errors.confirmEmail ? this.state.errors.confirmEmail : null}

                value={this.state.confirmEmail}
                onChange={this.onChange}
                fullWidth
              />


              <br />
              <br />
              <RaisedButton onClick={this.onClickAddUser} label="Add new user" primary fullWidth />
            </div>}

          {this.state.isAddingUser &&
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
  addNewUser,
})((AddUser)));

// export default withRouter(AddUser);
