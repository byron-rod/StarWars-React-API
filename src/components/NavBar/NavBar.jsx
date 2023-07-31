
import React, { useState } from 'react';
import { Link } from 'react-router-dom';



const NavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
   const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
   const navLinkClass = isCollapsed ? 'nav-link collapsed' : 'nav-link';
   return (
    <>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container d-flex justify-content-center align-items-center">
          <Link to="/" className="navbar-logo-link text-center">
            <img
              src="/sw-logo.png"
              alt="SW Logo"
              className="navbar-logo"
              style={{ width: '150px', height: '75px' }}
            />
          </Link>
        </div>
      </nav>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container d-flex justify-content-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse justify-content-center ${isCollapsed ? '' : 'show'}`} id="navbarCollapse">
            <ul className="navbar-nav navbar-nav-scroll">
              <li className="nav-item">
                <Link to="/films" className={navLinkClass}>
                  Films
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/people" className={navLinkClass}>
                  People
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/planets" className={navLinkClass}>
                  Planets
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/species" className={navLinkClass}>
                  Species
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/starships" className={navLinkClass}>
                  Starships
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/vehicles" className={navLinkClass}>
                  Vehicles
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className={navLinkClass}>
                <i className="fa-regular fa-heart"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
 export default NavBar;