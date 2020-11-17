import React from "react";
import "./style.css";

import sherpa2 from "../../assets/sherpa2.png";
// import D3GraphHorizontal from "../D3GraphHorizontal";
// import D3GraphVertical from "../D3GraphVertical";
import D3GraphTest from "../D3GraphTest";

export function WeeklyProgress() {
  return (
    <>
      <div className="dash-section-1">
        <img className="sherpa-img-smaller" src={sherpa2} alt="sherpa4" />
        <h1 className="section-title">your progress</h1>
      </div>

      <div>
        {/* < D3GraphHorizontal progressData={progressData}/> */}
        {/* <D3GraphVertical progressData={progressData} /> */}
        <D3GraphTest />
      </div>
    </>
  );
}
