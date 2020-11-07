import React from "react";
import "./style.css";

import mainKnot from "../../assets/main-knot.png";
import sherpa1 from "../../assets/sherpa1.png";

// components
import Register from "../../components/Register";

function Registration() {
  return (
    <>
      <div className="knot-container">
        <img className="sherpa-img s-1" src={sherpa1} alt="sherpa1" />

        <img id="main-knot" src={mainKnot} alt="knot-logo" />
        <div className="reg-form-container">
          <Register />
        </div>
      </div>
    </>
  );
}

export default Registration;
