import React from "react";
import "./style.css";

import mainKnot from "../../assets/main-knot.png";
import sherpa1 from "../../assets/sherpa1.png";

// components
import Login from "../../components/Login";

function UserLogin() {
  return (
    <>
      <div className="knot-container">
        <img className="sherpa-img s-1" src={sherpa1} alt="sherpa1" />

        <img id="main-knot" src={mainKnot} alt="knot-logo" />
        <div className="login-form-container">
          <Login />
        </div>
      </div>
    </>
  );
}

export default UserLogin;
