import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import '../css/Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const userPresent = useSelector((state) => state.user.id);
  return (
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
            <a className="navbar-brand" href="/">
              <img src={logo} alt="Rent a Car Logo" />
            </a>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/">Cars</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/session#login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reservations/new">Rent</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/reservations">My Rentals</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars/new">Add a Car</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars/delete">Delete Car</Link>
              </li>
              {
              userPresent && <LogoutBtn />
            }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
