import React, { Component } from 'react';
import { withRouter,
  // , NavLink
} from 'react-router-dom';

// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
// import validator from 'validator';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';
// import Avatar from 'material-ui/Avatar';
import {
  // grey400,
  darkBlack,
  // lightBlack
} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

// import ReactLoading from 'react-loading';

import { connect } from 'react-redux';
import { fetchUserList, toggleAdminPrivileges, deleteUser } from '../../state/amenity';
import './styles.scss'; //eslint-disable-line
// import BarChart from '../charts/bar';

const iconButtonElement = (
  <IconButton
    touch
    tooltip="Options"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

class RightIconMenu extends Component { //eslint-disable-line
  render() {

  }
}


class Login extends Component { // eslint-disable-line
  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      // isLoggingIn: false,

    };
  }
  componentWillMount() {
    this.props.fetchUserList();
  }

  onChange(e) {
    // console.log(e, e.target);

    this.setState({
      [e.target.name]: e.target.value,
    });
  }


  onToggle(userId) {
    this.props.toggleAdminPrivileges(userId);
  }

  onDelete(userId) {
    console.log(userId, 'tobedeleted');
    this.props.deleteUser(userId);
  }

  render() {
    const { userList } = this.props.amenity.auth;
    const { onToggle, onDelete } = this;
    return (

      <div className="row py-5 m-0 " style={{overflowY:"auto"}}>
        <div className="col-md-10 offset-md-1 col-12 py-5 px-0 text-center" style={{ border: '1px solid #e5e5e5', borderRadius: '15px' }}>
          {userList === undefined &&
            <h2>Fetching data..</h2>
          }

          {userList !== undefined &&
            <div>
              <h2>Manage Users</h2>
              <p>Use this section to provide and revoke admin privileges. </p>

              <List className="text-left">
                {userList.map((item) => {
                return (
                  <div>
                    <Divider />

                    <ListItem
                      rightIconButton={
                        <IconMenu iconButtonElement={iconButtonElement}>
                          {item.role === 'admin' && <MenuItem onClick={() => { onToggle(item._id); }}>Revoke admin access</MenuItem>}
                          {item.role !== 'admin' && <MenuItem onClick={() => { onToggle(item._id); }}>Provide admin access</MenuItem>}
                          <MenuItem onClick={() => { onDelete(item._id); }}>Delete user</MenuItem>
                        </IconMenu>

                      }
                      primaryText={
                        <p style={{ margin: 0 }}>
                          {item.name} {' '}
                          {item.role === 'admin' && <span className=" badge badge-primary">Admin</span>}
                        </p>
                    }
                      secondaryText={
                        <p>
                          <span style={{ color: darkBlack }}>{item.email} </span>

                        </p>
                    }
                    />
                    <Divider />
                  </div>
                );
              })}


              </List>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  amenity: state.amenity,
});


export default withRouter(connect(mapStateToProps, {
  fetchUserList, toggleAdminPrivileges, deleteUser,
})((Login)));

// export default withRouter(Login);
