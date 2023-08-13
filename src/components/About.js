import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

const About = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}'s</strong> Profile
        </h3>
      </header>
 
      <p>
        <strong>Id:</strong> {currentUser._id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {currentUser.role}
      </ul>
    </div>
  );
};

export default About;
