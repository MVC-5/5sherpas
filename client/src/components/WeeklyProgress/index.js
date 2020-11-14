import React from "react";

import "./style.css";

import sherpa2 from "../../assets/sherpa2.png";
import D3Graph from "../D3Graph";

export function WeeklyProgress() {
  return (
    <>
      <div className="dash-section-1">
        <img className="sherpa-img-smaller" src={sherpa2} alt="sherpa4" />
        <h1 className="section-title">weekly progress</h1>
      </div>
      
      <div>
        < D3Graph />
      </div>
    </>
  );
}
