import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

  const [theme, setTheme] = useState(true)

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary" style={{opacity:"0.98"}}>
          <div className="container-fluid">
            <Link to="/" className="navbar-brand">
              <h1>Lib</h1>
            </Link>
            <button
              className="navbar-toggler collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="navbar-collapse collapse"
              id="navbarCollapse"
              style={{}}
            >
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link
                    to="/collections"
                    className="d-flex align-items-center nav-link mb-2 mb-lg-0 text-light text-decoration-none"
                  >
                    Collections
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/items"
                    className="d-flex align-items-center nav-link mb-2 mb-lg-0 text-light text-decoration-none"
                  >
                    Items
                  </Link>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input
                  className="form-control me-5 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
              <div class="dropdown me-3">
                <button className="btn btn-success dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="fas fa-language " style={{fontSize:"20px"}}></i>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">eng</a></li>
                  <li><a className="dropdown-item" href="#">uz</a></li>
                </ul>
              </div>
              <div class="dropdown">
                <button className="btn btn-success dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i  className={theme ? 'fas fa-moon':'fas fa-sun'} style={{fontSize:"20px"}}></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="dropdown-item" href="#">Light</a></li>
                  <li><a className="dropdown-item" href="#">Dark</a></li>
                </ul>
              </div>
              
              <Link to="/me" className="me" title="Profile"><i className="fas fa-user ms-3" style={{fontSize:"20px"}}></i></Link>
            </div>
            
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
