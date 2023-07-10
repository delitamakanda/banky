import React from "react";

import AppDispatcher from '../../../dispatchers/main';
import UIConstants from "../../../constants";

class NavbarToggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    AppDispatcher.dispatch({
      actionType: UIConstants.TOGGLE_SIDEBAR
    });
  }

  render() {
    return (
      <nav className="nav">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <span onClick={this.handleClick} className="nav-link nav-link-icon toggle-sidebar d-sm-inline d-md-inline d-lg-none text-center">
          <i className="material-icons">&#xE5D2;</i>
        </span>
      </nav>
    )
  }
}

export default NavbarToggle;