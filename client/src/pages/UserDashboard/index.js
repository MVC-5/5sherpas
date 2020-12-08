/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../utils/UserContext";
import AuthContext from "../../utils/AuthContext";

import API from "../../utils/API";

import "./style.css";

// Components
import { MyDashboard } from "../../components/MyDashboard";
import ConsultSherpas from "../../components/ConsultSherpas";
import HelpfulModal from "../../components/HelpfulModal/HelpfulModal";

function userDashboard() {
  const [currentChall, setCurrentChall] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [update, setUpdate] = useState(false);

  const { isNewUser, userName } = useContext(AuthContext);

  const getDash = (id) => {
    API.getDashData(id)
      .then((dashData) => {
        setCurrentChall(dashData.data.currentChallenge);
        setProgressData(dashData.data.totalProgress);
      })
      .catch((err) => {
        throw err;
      });
  };

  useEffect(() => {
    getDash(sessionStorage.getItem("userId"));
  }, [update]);

  const welcomeMsg = (
    <>
      <h4>
        <span className="callout">
          Hi, {userName}! I&apos;m Yandrew your encouraging yak sidekick.
        </span>
      </h4>
      <h4>
        <span className="callout">
          Let me give you a quick tour as you begin your journey with us!
        </span>
      </h4>
      <p>
        First, you see your challenges and your progress. Each week you will see
        a new set of challenges arrive here. If you see something you never ever
        want to do click <span className="callout">NEVER</span>, or if you just
        want to swap it out for a new one and maybe see it another time click{" "}
        <span className="callout">SWAP</span>! When you have completed a
        challenge hit <span className="callout">COMPLETE</span> and you will
        immediately see your progress tracked on the graph.
      </p>
      <p>
        Moving on, we have three consulting sherpas: Tim, Jim, and Shirley. They
        are here to guide you with helpful suggestions and short activities to
        get you moving in the right direction (even Shirley who insists Netflix
        is the greatest form of self-care).
      </p>
    </>
  );

  return (
    <>
      <UserContext.Provider
        value={{
          currentChall,
          progressData,
          setUpdate,
          setCurrentChall,
          setProgressData,
        }}
      >
        <div id="dash-container">
          {isNewUser || localStorage.getItem("newUser") === "true" ? (
            <HelpfulModal
              headerMsg="Let's get  Yakalakin'!"
              modalContent={welcomeMsg}
              buttonText="Begin journey"
            />
          ) : null}

          <MyDashboard />
          <ConsultSherpas />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default userDashboard;
