import React, { useState ,useRef} from 'react'
import CustomPopup from './CustomPopup';
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate  } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import style from "../styling/cssstyling.module.css"
import logo from "../assets/login-logo.png";

import { register } from "../actions/auth";
const required = (value) => {
  if (!value) {
    return (
      <div className={style['req-field']} role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className={style['req-field']} role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className={style['req-field']} role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className={style['req-field']} role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
function Signup(props) {
  let navigate = useNavigate();
  const [visibility, setVisibility] = useState(true);
  const form = useRef();
  const checkBtn = useRef();

  const [role,setRole] = useState(0);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const popupCloseHandler = (e) => {
    setVisibility(e);
    props.closeSignup();
  };
  const onChangeRole = (e) =>{
    const role=e.target.value;
    setRole(role);
  } 
  const onChangeName = (e) =>{
    const name= e.target.value;
    setName(name);
  }

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(role,name, username, email, password))
        .then(() => {
          setSuccessful(true);
          navigate("/");
          window.location.reload();
          
        })
        .catch(() => {
          setSuccessful(false);
        
        });
    }
  };
  
  return (
    <div className={style['login-container']}>
         <CustomPopup onClose={popupCloseHandler}
        show={visibility}
  >
      <div className="col-md-12">
      <div className={style['card-container-signup']}>
      <div className={style["image-container"]}>
        <img
          src={logo}
          alt="profile-img"
          className={style['login-logo']}
        />
        </div>
        <h3 className={style['heading']}>Sign Up</h3>

        <Form onSubmit={handleRegister} ref={form} className={style['form-container']}>
        
            <div>

            <div className="form-group">
                <label htmlFor="username">Role</label>
                <Input
                  type="number"
                  className="form-control"
                  name="role"
                  value={role}
                  onChange={onChangeRole}
                  validations={[required]}
                />
              </div>
               <div className="form-group">
                <label htmlFor="username">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChangeName}
                  validations={[required]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <button className={`btn btn-primary ${style['login-button']}`}>Sign Up</button>
              </div>
            </div>
      

          {(message || successful) && (
            <div  className="form-group" >
              <div className={style['alert']} role="alert">
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
          
      </CustomPopup>
    </div>
  )
}

export default Signup
