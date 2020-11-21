import React, { useContext } from "react";
import UserContext from "../../utils/UserContext";
import { Segment, Button } from "semantic-ui-react";
import API from "../../utils/API";

import "./style.css";

const Challenge = ({ challenge, status }) => {
  const { setCurrentChall, setProgressData } = useContext(UserContext);

  const handleButtonClick = (action) => {
    const userId = sessionStorage.getItem("userId");
    const challData = {
      userId: userId,
      challengeId: challenge._id,
      action: action,
    };
    console.log(challData);
    API.updateChall(challData).then((res) => {
      console.log(res.data);
      setCurrentChall(res.data.currentChallenge);
      setProgressData(res.data.totalProgress);
    });
  };
  return (
    <>
      <div id="challenge-holder">
        <Segment.Group>
          <Segment.Group>
            <Segment
              id="challenge-description"
              className={status ? "completeChall" : "notCompleteChall"}
            >
              {challenge.name}
            </Segment>
          </Segment.Group>
        </Segment.Group>
      </div>
      <div id="button-group">
        <Segment.Group>
          <Button
            id="button-style"
            name="complete"
            size="large"
            onClick={(e) => {
              handleButtonClick(e.target.name);
            }}
          >
            Done
          </Button>
          <Button
            id="button-style"
            name="never"
            size="large"
            onClick={(e) => {
              handleButtonClick(e.target.name);
            }}
          >
            Never
          </Button>
          <Button
            id="button-style"
            name="swap"
            size="large"
            onClick={(e) => {
              handleButtonClick(e.target.name);
            }}
          >
            {status ? "Get New" : "Swap"}
          </Button>
        </Segment.Group>
      </div>
    </>
  );
};

export default Challenge;
