import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import userService from "../services/user.service";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../actions/auth";
import style from "../styling/cssstyling.module.css";

const { isLoggedIn } = userService;

function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
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
    <>
      <nav className={"navbar navbar-expand-lg custom-navbar"}>
        <Link className="navbar-brand pl-3" to="/">
          <strong>Event Management</strong>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className={`nav-item ${isHomePage ? "active" : ""}`}>
              <Link
                className={`nav-link ${
                  isHomePage ? "font-weight-bold home-link" : "home-link"
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            {loggedIn && (
              <li className={`nav-item ${isAboutPage ? "active" : ""}`}>
                <Link
                  className={`nav-link ${
                    isAboutPage ? "font-weight-bold" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* Right-aligned links */}
        <div className="ml-auto">
          <ul className="navbar-nav">
            {!loggedIn && (
              <li className={style["nav-item"]}>
                <button className={style["nav-button"]} onClick={closeLogin}>
                  Login
                </button>
              </li>
            )}
            {!loggedIn && (
              <li className={style["nav-item"]}>
                <button className={style["nav-button"]} onClick={closeSignup}>
                  Sign Up
                </button>
              </li>
            )}
            {loggedIn && (
              <li className={style["nav-item"]}>
                <button className={style["nav-button"]} onClick={handleLogOut}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {loginVisibility && <Login closeLogin={closeLogin} />}
      {signupVisibility && <Signup closeSignup={closeSignup} />}
    </>
  );
}

export default Navbar;
