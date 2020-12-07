import React from "react";
import "./style.css";

export function LandingIntro() {
  return (
    <>
      <div id="intro" className="intro-container">
        <h1 className="intro-title">Yakan-do-it!</h1>
        <h2 className="intro-text">
          The <span className="intro-title">5 Sherpas</span> give you
          personalized suggestions to achieve a healthier and more balanced life
          through activities called weekly challenges.
          <br></br>
          <br></br>
          Create an account and begin your journey, improve your wellness,
          health, mental cognition, organization skills, career satisfaction,
          and interpersonal relationships.
        </h2>
      </div>
    </>
  );
}
