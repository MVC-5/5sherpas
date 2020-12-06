import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";

import "./style.css";

import sherpa4 from "../../assets/sherpa4.png";
import Challenge from "../Challenge";
import { Link } from "react-router-dom";

export function WeeklyChallenges() {
  const { currentChall } = useContext(UserContext);

  return (
    <>
      <div className="dash-section-1">
        <img className="sherpa-img-smaller" src={sherpa4} alt="sherpa4" />
        <h1 className="section-title">weekly challenges</h1>
      </div>
      <div className="challenges-container">
        {!currentChall.length ? (
          <h3>
            To get challenges go to <Link to="/usersettings">your profile</Link>{" "}
            to select categories.
          </h3>
        ) : (
          currentChall.map((chall) => {
            return (
              <Challenge
                key={chall.challengeId._id}
                challenge={chall.challengeId}
                status={chall.completed}
              />
            );
          })
        )}
      </div>
    </>
  );
}
