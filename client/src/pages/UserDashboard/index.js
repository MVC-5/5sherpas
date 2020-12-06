/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import UserContext from "../../utils/UserContext";
import API from "../../utils/API";

import "./style.css";

// Components
import { MyDashboard } from "../../components/MyDashboard";
import ConsultSherpas from "../../components/ConsultSherpas";

function userDashboard() {
  const [currentChall, setCurrentChall] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [update, setUpdate] = useState(false);

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

  // useEffect(() => {
  //   getDash(sessionStorage.getItem("userId"));
  // }, []);

  useEffect(() => {
    getDash(sessionStorage.getItem("userId"));
  }, [update]);
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
          <MyDashboard />
          <ConsultSherpas />
        </div>
      </UserContext.Provider>
    </>
  );
}

export default userDashboard;
