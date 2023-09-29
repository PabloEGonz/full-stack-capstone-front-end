import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => (
  <nav className="navbar navbar-body bg-body-tertiary fixed-top">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <a className="navbar-brand" href="/">
        <img src={logo} alt="Rent a Car Logo" />
      </a>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Rent a Car</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">Cars</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/session">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations/new">Reserve</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservations">My reservations</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cars/new">Add a Car</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cars/delete">Delete a Car</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
