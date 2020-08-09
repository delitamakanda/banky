import React, { Component } from "react";
import { Nav } from "shards-react";
import { Container } from 'flux/utils';
import { convert } from '../../../../utils/misc';
import AccountStore from "../../../../stores/AccountStore";
import AuthActions from '../../../../actions/AuthActions';

import Notifications from "./Notifications";
import UserActions from "./UserActions";

class NavbarNav extends Component {

  componentDidMount() {
    AuthActions.getCurrentUser()
  }

  render() {
    return <Nav navbar className="border-left flex-row">
      <Notifications />
      <UserActions user={this.state.user} />
    </Nav>
  }
}

NavbarNav.getStores = () => ([AccountStore]);
NavbarNav.calculateState = () => ({
  user: AccountStore.getState()
});

export default Container.create(convert(NavbarNav));
