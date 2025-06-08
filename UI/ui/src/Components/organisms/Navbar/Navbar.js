import {
  NavbarCard,
  NavbarOption,
  NavbarOptionText,
  NavbarTitle,
  HamburgerIcon,
} from "./Navbar.styles.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faFaceSmile,
  faChartSimple,
  faListCheck,
  faNoteSticky,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <HamburgerIcon onClick={() => setMenuOpen(!menuOpen)} isOpen={menuOpen}>
        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} color="black" />
      </HamburgerIcon>

      <NavbarCard className={menuOpen ? "open" : ""}>
        <NavbarTitle>Smart Habit Tracker</NavbarTitle>

        <Link
          to="/statistics"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <NavbarOption>
            <FontAwesomeIcon icon={faChartSimple} />
            <NavbarOptionText>Statistics</NavbarOptionText>
          </NavbarOption>
        </Link>

        <Link
          to="/notes"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <NavbarOption>
            <FontAwesomeIcon icon={faNoteSticky} />
            <NavbarOptionText>Notes</NavbarOptionText>
          </NavbarOption>
        </Link>

        <Link
          to="/habits"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <NavbarOption>
            <FontAwesomeIcon icon={faListCheck} />
            <NavbarOptionText>Habits</NavbarOptionText>
          </NavbarOption>
        </Link>

        <Link
          to="/mood"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <NavbarOption>
            <FontAwesomeIcon icon={faFaceSmile} />
            <NavbarOptionText>Mood</NavbarOptionText>
          </NavbarOption>
        </Link>

        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <NavbarOption>
            <FontAwesomeIcon icon={faUser} />
            <NavbarOptionText>Profile</NavbarOptionText>
          </NavbarOption>
        </Link>

        <Link
          to="/log-out"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <NavbarOption>
            <FontAwesomeIcon icon={faRightFromBracket} />
            <NavbarOptionText>Log out</NavbarOptionText>
          </NavbarOption>
        </Link>
      </NavbarCard>
    </>
  );
};

export default Navbar;
