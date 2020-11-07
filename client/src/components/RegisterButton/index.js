import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./style.css";

export function RegisterButton() {
  return (
    <Link to="/register">
      <Button size="massive" id="mainButton">
        Begin Journey
      </Button>
    </Link>
  );
}
