import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import userService from "../services/user.service";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../actions/auth";
import style from "../styling/navbar.module.css";

const { isLoggedIn } = userService;

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isCreateEventsPage = location.pathname ==='/create-event';
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [signupVisibility, setSignupVisibility] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    isLoggedIn()
      .then((response) => {
        if (response.data.status === true) {
          setLoggedIn(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/");
    window.location.reload();
  };

  const closeSignup = () => {
    setSignupVisibility(!signupVisibility);
  };

  const closeLogin = () => {
    setLoginVisibility(!loginVisibility);
  };

  return (
    <nav className={style["navbar"]}>
      <div className={style["navbar-heading"]}>event management</div>
      <ul className={style["navbar-items"]}>
        <li>
          <Link
            to="/"
            className={`${style["navbar-item"]} ${
              isHomePage ? style["active"] : ""
            }`}
          >
            Home
          </Link>
        </li>
        {loggedIn && (
          <li>
            <Link
              to="/about"
              className={`${style["navbar-item"]} ${
                isAboutPage ? style["active"] : ""
              }`}
            >
              About
            </Link>
          </li>
        )}

          {loggedIn && (
          <li>
            <Link
              to="/create-event"
              className={`${style["navbar-item"]} ${
                isCreateEventsPage ? style["active"] : ""
              }`}
            >
              Create Event
            </Link>
          </li>
        )}
      </ul>
      <div className={style["nav-buttons"]}>
        {!loggedIn && (
          <button className={style["nav-button"]} onClick={closeLogin}>
            Login
          </button>
        )}
        {!loggedIn && (
          <button className={style["nav-button"]} onClick={closeSignup}>
            Sign Up
          </button>
        )}
        {loggedIn && (
          <button className={style["nav-button"]} onClick={handleLogOut}>
            Logout
          </button>
        )}
      </div>
      {loginVisibility && <Login closeLogin={closeLogin} />}
      {signupVisibility && <Signup closeSignup={closeSignup} />}
    
    </nav>

  )
  
}

export default Navbar;
