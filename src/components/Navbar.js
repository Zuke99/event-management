
import { useState } from 'react';
import { Link } from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';


function Navbar() {
  const [loginVisibility, setLoginVisibility] = useState(false);
  const [signupVisibility, setSignupVisibility] = useState(false);
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
   } else 
   {
    setLoginVisibility(true);
   }
  }
 
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <a className="navbar-brand" href="/">Event K</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/">Home </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
      </ul>
    </div>
    
    {/* Right-aligned links */}
    <div className="ml-auto">
      <ul className="navbar-nav">
        <li className="nav-item">
        <button onClick={(e) => setLoginVisibility(!loginVisibility)}>Login</button>
        </li>
        <li className="nav-item">
        <button onClick={(e) => setSignupVisibility(!signupVisibility)}>SignUp</button>
        </li>
      </ul>
    </div>
  </nav>
  
   { loginVisibility && <Login closeLogin={closeLogin}></Login>}
   { signupVisibility && <Signup closeSignup={closeSignup}></Signup>}


  </>
  


  )
}

export default Navbar
