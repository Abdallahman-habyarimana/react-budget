import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light">
          <NavLink clNavLinkssName="navbar-brand">Home Bugdet</NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/expenses">
                  Expenses
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/income">
                  Income
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default Navbar;
