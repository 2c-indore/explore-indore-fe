import React, { Component } from 'react';
import shortid from 'shortid';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import Hamburger from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import { sidebarMenuItems } from '../../../static/constants';

import { initializeView } from '../../../state/amenity';

// import './styles.scss';

const HamburgerIcon = ({ onClick }) => {
  return <IconButton onClick={onClick} ><Hamburger color="#333" /></IconButton>;
};

const DrawerMenu = ({
  open, onRequestChange, menuItems, history, initView,
}) => {
  // console.log(history);
  return (
    <Drawer docked={false} open={open} onRequestChange={onRequestChange}>
      <List>
        {menuItems.map((category) => {
          const subItems = [];
          category.children.forEach((item) => {
            subItems.push(<ListItem
              onClick={() => { history.push(`/amenities${item.route}`); onRequestChange(item.type); initView(item.type); }}
              style={history.location.pathname === item.route ? { color: 'red' } : {}}
              key={shortid.generate()}
              primaryText={item.label}
            />);
          });
        return (
          <div key={shortid.generate()}>
            <ListItem primaryText={category.category}
              initiallyOpen={false}
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

  toggleDrawer(type) {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    });

    // this.props.initializeView(type);
  }

  render() {
    return (
      <div>
        <AppBar
          // zDepth={0}
          title="Explore Pokhara"
          iconElementLeft={<HamburgerIcon onClick={this.toggleDrawer} />}
        />
        <DrawerMenu
          open={this.state.isDrawerOpen}
          onRequestChange={this.toggleDrawer}
          menuItems={sidebarMenuItems}
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
  initializeView,
})((Nav)));

// export default withRouter(Nav);
