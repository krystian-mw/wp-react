import React from "react";

import { Link, withRouter } from "react-router-dom";

import { Navbar, NavbarToggler } from "reactstrap";

import Logo from "./Logo";

class Nav extends React.Component {
  _isMounted = false;

  constructor(props) {
    super();
    this.state = {
      navShow: false,
    };
    props.history.listen(() => {
      if (!this._isMounted) return null;
      let tempState = {};
      Object.keys(this.state).forEach((key) => {
        tempState[key] = false;
      });
      this.setState(tempState);
    });
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  toggleNav = (id) => {
    if (!this._isMounted) return null;
    if (typeof id !== "number") {
      this.setState({
        navShow: !this.state.navShow,
      });
    } else {
      this.setState({
        [`nav-${id}`]: !this.state[`nav-${id}`],
      });
    }
  };

  getNavChildren(id) {
    let navChildren = [];
    this.props.NavItems.forEach((item) => {
      if (item.parent === id) {
        navChildren.push(item);
      }
    });
    return navChildren;
  }

  renderNavMenu = () => {
    let out = [];
    this.props.NavItems.forEach((item) => {
      let navChildren = this.getNavChildren(item.id);
      if (navChildren.length <= 0 && !(`nav-${item.id}` in this.state)) {
        this.state = { ...this.state, [`nav-${item.id}`]: false };
      }
      out.push(
        navChildren.length <= 0 ? (
          <li
            key={item.url}
            className={`nav-item ${
              item.url === window.location.pathname ? "active" : ""
            }`}
          >
            <Link className="nav-link" to={item.url}>
              {item.title}
            </Link>
          </li>
        ) : (
          <li
            key={item.url}
            className={`nav-item dropdown ${
              item.url === window.location.pathname ? "active" : ""
            }`}
          >
            <a
              className="nav-link dropdown-toggle"
              role="button"
              onClick={() => this.toggleNav(item.id)}
            >
              {item.title}
            </a>
            {(() => {
              let out = [];
              navChildren.forEach((item) => {
                out.push(
                  <Link
                    key={item.title}
                    className="dropdown-item"
                    to={item.url}
                  >
                    {item.title}
                  </Link>
                );
              });
              return (
                <div
                  key={0}
                  className={`dropdown-menu ${
                    this.state[`nav-${item.id}`] ? "show" : ""
                  }`}
                >
                  <Link className="dropdown-item" to={item.url}>
                    {item.title}
                  </Link>
                  <div className="dropdown-divider"></div>
                  {out}
                </div>
              );
            })()}
          </li>
        )
      );
    });
    return out;
  };

  render() {
    // return this._isMounted ? (
    return (
      <div className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <Logo />
        <NavbarToggler onClick={this.toggleNav} />
        <ul
          className={`navbar-nav justify-content-end collapse navbar-collapse ${
            this.state.navShow ? "show" : ""
          }`}
        >
          <this.renderNavMenu />
        </ul>
      </div>
    );
    // ) : null;
  }
}

export default withRouter(Nav);
