import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CATEGORIES from '../categories';

export class Navbar extends Component {
  render() {
    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark nn-navbar">
        <div className="container">
          <Link className="navbar-brand nn-brand d-flex align-items-center gap-2" to="/">
            <img src={`${process.env.PUBLIC_URL}/favicon.svg`} alt="" width="28" height="28" />
            <span>News<span className="nn-accent-word">Now</span></span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto gap-1 py-2 py-lg-0">
              {CATEGORIES.map((c) => (
                <li className="nav-item" key={c.key}>
                  <NavLink className="nav-link" end to={c.path}>
                    {c.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
