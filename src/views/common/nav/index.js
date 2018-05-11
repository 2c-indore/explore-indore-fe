import React, { Component } from 'react';
import shortid from 'shortid';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Hamburger from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import { withRouter } from 'react-router-dom';
import { sidebarMenuItems } from '../../../static/constants';
// import './styles.scss';

const HamburgerIcon = ({ onClick }) => {
  return <IconButton onClick={onClick} ><Hamburger color="#333" /></IconButton>;
};

const DrawerMenu = ({
  open, onRequestChange, menuItems, history,
}) => {
  // console.log(history);
  return (
    <Drawer docked={false} open={open} onRequestChange={onRequestChange}>
      <List>
        {menuItems.map((category) => {
          const subItems = [];
          category.children.forEach((item) => {
            subItems.push(<ListItem
              onClick={() => { history.push(item.route); onRequestChange(); }}
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

  toggleDrawer() {
    this.setState({
      isDrawerOpen: !this.state.isDrawerOpen,
    });
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
        />
      </div>
    );
  }
}

export default withRouter(Nav);
