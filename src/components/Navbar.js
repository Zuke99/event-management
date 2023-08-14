
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import userService from "../services/user.service"
import { useDispatch} from 'react-redux';
import {  useNavigate, useLocation  } from 'react-router-dom';
import {logout} from '../actions/auth';
import style from "../styling/cssstyling.module.css"
import "../styling/cssstyling.module.css";

const { isLoggedIn } = userService;
function Navbar() {

  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAboutPage = location.pathname ==='/about';
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [signupVisibility, setSignupVisibility] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const dispatch = useDispatch();
  const navigate= useNavigate();

  

  isLoggedIn()
  .then((response) => {
    if(response.data.status === true){
      setLoggedIn(true);
    } 

  })
  .catch((error) => {
    console.error("Error fetching admin data:", error);
  });
  const handleLogOut = () =>{
    dispatch(logout())
    navigate("/");
    window.location.reload();
   
  }

  const closeSignup= () =>{
    if(signupVisibility){
      setSignupVisibility(false);
    } else {
      setSignupVisibility(true);
    }
  }
  const closeLogin =()=>{
   if(loginVisibility){
    setLoginVisibility(false);
   } else {
    setLoginVisibility(true);
   }
  }
 
  return (
    <>
    <nav className="navbar navbar-expand-lg  custom-navbar">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a className="navbar-brand pl-3" href="/"><strong>Event Management</strong></a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto">
        <li className={`nav-item ${isHomePage ? 'active' : ''}`}>
          <Link className={`nav-link ${isHomePage ? 'font-weight-bold home-link' : 'home-link'}`} to="/">Home</Link>
        </li>
        <li className={`nav-item ${isAboutPage ? 'active' : ''}`}>
          <Link className={`nav-link ${isAboutPage ? 'font-weight-bold' : ''}`} to="/about">About</Link>
        </li>
      </ul>
    </div>
    
    {/* Right-aligned links */}
    <div className="ml-auto">
      <ul className="navbar-nav">
        {!loggedIn && <li className={style["nav-item"]}>
        <button onClick={(e) => setLoginVisibility(!loginVisibility)}>Login</button>
        </li>}
        {!loggedIn && <li className={style["nav-item"]}>
        <button onClick={(e) => setSignupVisibility(!signupVisibility)}>SignUp</button>
        </li>}
        {loggedIn && <li className={style["nav-item"]}>
        <button onClick={handleLogOut}>LogOut</button>
        </li>}
      </ul>
    </div>
  </nav>
  
   { loginVisibility && <Login closeLogin={closeLogin}></Login>}
   { signupVisibility && <Signup closeSignup={closeSignup}></Signup>}


  </>
  


  )
}

export default Navbar
