import React from "react";
// import { Container } from "semantic-ui-react";
import "./style.css";
import mainKnot from "../../assets/main-knot.png";
import sherpa1 from "../../assets/sherpa1.png";
import sherpa2 from "../../assets/sherpa2.png";
import sherpa3 from "../../assets/sherpa3.png";
import sherpa4 from "../../assets/sherpa4.png";
import sherpa5 from "../../assets/sherpa5.png";

// components
import { RegisterButton } from "../../components/RegisterButton";

function LandingPage() {
  return (
    <>
      {/* <Container className="LP-container"> */}
      <div className="knot-container">
        <img className="sherpa-img s-1" src={sherpa1} alt="sherpa1" />
        <img className="sherpa-img s-2" src={sherpa2} alt="sherpa2" />
        <img className="sherpa-img s-3" src={sherpa3} alt="sherpa3" />
        <img className="sherpa-img s-5" src={sherpa4} alt="sherpa4" />
        <img className="sherpa-img s-4" src={sherpa5} alt="sherpa5" />
        <img id="main-knot" src={mainKnot} alt="knot-logo" />
        <div className="register-btn">
          <RegisterButton />
        </div>
      </div>
      {/* </Container> */}
    </>
  );
}

export default LandingPage;
