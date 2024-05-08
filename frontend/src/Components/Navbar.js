import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  var navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    console.log("logout");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ color: "black" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          NewsNote
        </Link>
        <button
          style={{ backgroundColor: "white", float: "left" }}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span
            style={{
              width: "auto",
              fontSize: "15px",
              padding: "3px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "5px",
            }}
            className="navbar-toggler-icon"
          >
            Expand
          </span>
        </button>
        <div
          className="collapse navbar-collapse"
          style={{ marginLeft: "auto" }}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/general">
                General
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/health">
                Health
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/business">
                Business
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/entertainment">
                Entertainment
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/science">
                Science
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sports">
                Sports
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/technology">
                Technology
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <Link
              className="btn btn-sm btn-outline-light mx-1"
              id="notebtn"
              role="button"
              to="/login"
              target="_blanked"
            >
              Notes
            </Link>
          ) : (
            <button
              className="btn btn-sm btn-outline-light mx-1"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
