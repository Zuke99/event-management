import { useRef, useState } from "react";
import CustomPopup from "./CustomPopup";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate  } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import logo from "../assets/login-logo.png";
import style from "../styling/cssstyling.module.css"
import { loginUser } from "../redux/userSlice";



function Login(props) {
  const [visibility, setVisibility] = useState(true);

  let navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 // const [req, setReq] = useState(null);
  const [loading, setLoading] = useState(false);

 // const { isLoggedIn } = useSelector(state => state.auth);
 
  const { loginMessage } = useSelector(state => state.app);

  
 

  const dispatch = useDispatch();
  const required = (value ) =>{
    if(!value){
      return(
        
        <div className={style['req-field']} role="alert">
          This Field is Required!
          </div>
      )
    }
  }

  const popupCloseHandler = (e) => {
    navigate("/");
    setVisibility(e);
    props.closeLogin();
    
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = async (e) =>{
    e.preventDefault();
    setLoading(true);

    form.current.validateAll();
    const data ={
      email : email,
      password : password
    }

    if(checkBtn.current.context._errors.length === 0){
      const result = await dispatch(loginUser(data));
      if(loginUser.fulfilled.match(result)){
        localStorage.setItem("user",result.payload.data.data.token)
        popupCloseHandler();
        window.location.reload();
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
      
    } else {
      setLoading(false);
    }
  };

  // if(isLoggedIn){
  //   return <Navigate to="/about" />
  // }
  return (
    <>
   
    <div className={style['login-container']}>
      <CustomPopup onClose={popupCloseHandler}
        show={visibility}
        >
          <div className="col-md-12">
      <div className={style['card-container']}>
        <div className={style["image-container"]}>
        <img
          src={logo}
          alt="profile-img"
          className={style['login-logo']}
        />
        </div>
        <h3 className={style['heading']}>Login</h3>

        <Form onSubmit={handleLogin} ref={form} className={style['form-container']}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <Input
              type="text"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
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
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className={`btn btn-primary ${style['login-button']}`} disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

         
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
      
        </Form>
      
      </div>
      {loginMessage && (
            <div className="form-group">
              <div className={style['alert']} role="alert">
                {loginMessage}
              </div>
            </div>
          )}
    </div>
      </CustomPopup>
    </div>
    </>
  )
}

export default Login
