import React from "react";
import { Container } from "semantic-ui-react";
import "./style.css";

// components
import { RegisterButton } from "../../components/RegisterButton";

function LandingPage() {
  return (
    <>
      <Container className="LP-container">
        <div className="register-btn">
          <RegisterButton />
        </div>
      </Container>
    </>
  );
}

export default LandingPage;
