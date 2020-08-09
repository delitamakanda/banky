import React, { Component } from "react";
import PropTypes from "prop-types"
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import Gravatar from 'react-gravatar';
import AuthActions from '../../../../actions/AuthActions';
// import AuthStore from "../../../../stores/AuthStore";

class UserActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  logout = event => {
    event.preventDefault();

    AuthActions.logout();
  }

  render() {
    const { user } = this.props;

    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <Gravatar size={40} className="user-avatar rounded-circle mr-2" email={user.email} md5="" />
          {" "}
          <span className="d-none d-md-inline-block">{user.username}</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger">
            <span onClick={this.logout}><i className="material-icons text-danger">&#xE879;</i> Logout</span>
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

UserActions.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserActions;