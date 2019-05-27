import React, { Component } from 'react';
import shortid from 'shortid';
import qs from 'qs';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Hamburger from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import { sidebarMenuItems, varToTitle } from '../../../static/constants';


import { initializeView, removeEditState } from '../../../state/amenity';

import './styles.scss';

const HamburgerIcon = ({ onClick }) => {
  return <IconButton onClick={onClick} className="hamburger" ><Hamburger color="#333" /></IconButton>;
};

const DrawerMenu = ({
  open, onRequestChange, menuItems, history, initView, removeEditStateFromMap,
}) => {
  // console.log(history);
  return (
    <Drawer docked={false} open={open} onRequestChange={onRequestChange}>
      <List>
        <Subheader style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>Select a category</Subheader>
        {menuItems.map((category) => {
          const subItems = [];
          category.children.forEach((item) => {
            subItems.push(<ListItem
              onClick={() => { removeEditStateFromMap(); history.push(`/amenities${item.route}`); onRequestChange(item.type); initView(item.type); }}
              style={history.location.pathname === item.route ? { color: '#3590f3' } : {}}
              key={shortid.generate()}
              primaryText={item.label}
            />);
          });
        return (
          <div key={shortid.generate()}>
            <ListItem primaryText={category.category}
              initiallyOpen
              innerDivStyle={{ fontWeight: 600 }}
              primaryTogglesNestedList
              nestedItems={subItems}
            />

          </div>
       );
    })}
      </List>
    </Drawer>
  );
};


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  getNavTitle(currentPathName) { //eslint-disable-line
    let finalArray;

    if (currentPathName.length === 3 && currentPathName[1] === 'amenities') {
      finalArray = [`${varToTitle[currentPathName[2]]}`, 'in', 'Indore Municipal Corporation'];
    } else if (currentPathName.length === 3 && currentPathName[1] === 'share') {
      const amenityType = qs.parse(window.atob(currentPathName[2])).type;
      finalArray = [`${varToTitle[amenityType]}`, 'in', 'Indore Municipal Corporation'];
    } else {
      finalArray = ['Explore', 'Indore'];
    }
    return finalArray;
  }

  toggleDrawer(type) {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    });

    // this.props.initializeView(type);
  }

  render() {
    const currentPathName = this.props.history.location.pathname.split('/');


    // const navbarTitle = (currentPathName.length === 3 && currentPathName[1] === 'amenities') ? [`${varToTitle[currentPathName[2]]}`, 'in', 'Pokhara Lekhnath Metropolitan'] : ['Prepare', 'Pokhara'];
    // console.log('titke', currentPathName, currentPathName.split('/'), navbarTitle);
    const navbarTitle = this.getNavTitle(currentPathName);

    return (
      <div>
        <AppBar
          zDepth={1}
          titleStyle={{ fontSize: '1.2rem' }}
          title={<span className="currentAmenity"><b>{navbarTitle[0]}</b> {navbarTitle[1]} {navbarTitle[2]}</span>}
          iconElementLeft={<HamburgerIcon onClick={this.toggleDrawer} />}
          iconElementRight={
            <div style={{ paddingTop: '5px' }}>
              {currentPathName[1] === 'edit' && <FlatButton onClick={() => { this.props.history.push(`/amenities/${this.props.amenity.type}`); }} label="Go Back" />}
              <FlatButton onClick={() => { this.props.history.push('/about'); }} label="About" />
            </div>
          }
        />
        <DrawerMenu
          open={this.state.isDrawerOpen}
          onRequestChange={this.toggleDrawer}
          menuItems={sidebarMenuItems}
          removeEditStateFromMap={this.props.removeEditState}
          history={this.props.history}
          initView={this.props.initializeView}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  amenity: state.amenity,

});


export default withRouter(connect(mapStateToProps, {
  initializeView, removeEditState,
})((Nav)));

// export default withRouter(Nav);
