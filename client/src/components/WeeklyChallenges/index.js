import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";

import "./style.css";

import sherpa4 from "../../assets/sherpa4.png";
import Challenge from "../Challenge";

export function WeeklyChallenges() {
  const { currentChall } = useContext(UserContext);

  return (
    <>
      <div className="dash-section-1">
        <img className="sherpa-img-smaller" src={sherpa4} alt="sherpa4" />
        <h1 className="section-title">weekly challenges</h1>
      </div>
      <div className="challenges-container">
        {currentChall.map((chall) => {
          return (
            <Challenge
              key={chall.challengeId._id}
              challenge={chall.challengeId}
              status={chall.completed}
            />
          );
        })}
      </div>
    </>
  );
}
