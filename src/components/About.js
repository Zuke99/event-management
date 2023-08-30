import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import style from "../styling/about-config.module.css";
import { isLoggedIn, role, userDetails } from "../redux/userSlice";

const About = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {name, id, email} = useSelector(state => state.app);

  const [admin , setAdmin] = useState(false);

  useEffect(() => {
    dispatch(isLoggedIn())
      .unwrap()
      .then((result) => {
        console.log("About", result);
       
      })
      .catch((error) => {
        navigate("/login");
        console.log("AboutReject", error);
      });

      dispatch(userDetails())
      .unwrap()
      .then((result) =>{
        console.log("USerDetaiis",result);
      }).catch((error) => {
        console.log("USerDetReject", error);
      });


      dispatch(role())
            .unwrap()
            .then((result) => {
              if(result.result===1){
                  console.log("Admin");
                  setAdmin(true);
              } else {
                  console.log("NotAdmin");
              }
            
            })
            .catch((error) => {
              console.log("ROLE", error);
             
            });
  }, [dispatch, navigate]);

  const onClickApproveButton = () =>{
    localStorage.setItem('navigate', "about");
    navigate("/approve-events")
  }

  return (
    <div className={style.container}>
      <div className={style.card}>
        <header className={style.cardHeader}>
          <h1>Account Overview</h1>
          <h3>Profile</h3>
        </header>
        <div className={style.cardContent}>
          <table className={style.table}>
            <tbody>
              <tr className={style.row}>
                <td>Username:</td>
                <td>{name}</td>
              </tr>
              <tr className={style.row}>
                <td>Id:</td>
                <td>{id}</td>
              </tr>
              <tr className={style.row}>
                <td>Email:</td>
                <td>{email}</td>
              </tr>
              <tr className={style.row}>
                <td>Authorities:</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.cardContent}>
          <button
            className={`${style.button} ${style.row}`}
            // onClick={handleChangeEmail}
          >
            Change Email
          </button>
          <button
            className={`${style.button} ${style.row}`}
            // onClick={handleChangePassword}
          >
            Change Password
          </button>
          {admin && <button
            onClick={onClickApproveButton}
            className={`${style.button} ${style.row}`}
            // onClick={handleChangePassword}
          >
            Approve Events
          </button>}
        </div>
      </div>
    </div>
  );
};

export default About;
