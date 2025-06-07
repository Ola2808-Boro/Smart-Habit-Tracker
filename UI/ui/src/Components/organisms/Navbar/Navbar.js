import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faChartSimple,
  faListCheck,
  faNoteSticky,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className="navbar-card">
      <div>
        <h2 className="navbar-card-title">Smart Habit Tracker</h2>
      </div>

      <Link
        to="/statistics"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <div className="navbar-card-option">
          <FontAwesomeIcon icon={faChartSimple} />
          <p className="navbar-card-option-text">Statistics</p>
        </div>
      </Link>
      <Link
        to="/notes"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <div className="navbar-card-option">
          <FontAwesomeIcon icon={faNoteSticky} />
          <p className="navbar-card-option-text">Notes</p>
        </div>
      </Link>
      <Link
        to="/habits"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <div className="navbar-card-option">
          <FontAwesomeIcon icon={faListCheck} />
          <p className="navbar-card-option-text">Habits</p>
        </div>
      </Link>
      <Link
        to="/mood"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <div className="navbar-card-option">
          <FontAwesomeIcon icon={faFaceSmile} />
          <p className="navbar-card-option-text">Mood</p>
        </div>
      </Link>
      <Link
        to="/profile"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <div className="navbar-card-option">
          <FontAwesomeIcon icon={faUser} />
          <p className="navbar-card-option-text">Profile</p>
        </div>
      </Link>
      <Link
        to="/log-out"
        style={{ textDecoration: "none", color: "black", width: "100%" }}
      >
        <div className="navbar-card-option">
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p className="navbar-card-option-text">Log out</p>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
