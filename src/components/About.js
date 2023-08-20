import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "../styling/about-config.module.css";

const About = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
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
                <td>{currentUser.username}</td>
              </tr>
              <tr className={style.row}>
                <td>Id:</td>
                <td>{currentUser._id}</td>
              </tr>
              <tr className={style.row}>
                <td>Email:</td>
                <td>{currentUser.email}</td>
              </tr>
              <tr className={style.row}>
                <td>Authorities:</td>
                <td>{currentUser.role}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={style.cardContent}>
          <table className={style.table}>
            <tbody>{/* Display user information */}</tbody>
          </table>
          {/* Add the "Change Password" button */}
          <button
            className={`${style.button} ${style.row}`}
            // onClick={handleChangePassword}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
