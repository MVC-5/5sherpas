import React, { useContext } from "react";
// import API from "../utils/API";
import { Container } from "../components/Grid";
import AuthContext from "../utils/AuthContext";

function User() {
  const { userId, userEmail, userName } = useContext(AuthContext);

  // API.getUser()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.getUserSettings(1)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.updateUserSettings(1)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.getDashData(1)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.getNewChallenge()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.getMovieSugg()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.getPhysActSugg()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.getMentalActSugg()
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));
  // API.updateChall(1)
  //   .then((res) => console.log(res))
  //   .catch((err) => console.log(err));

  return (
    <>
      <Container></Container>
      <h1>Hello {userName}!</h1>
      <p>{userEmail}</p>
      <p>{userId}</p>
    </>
  );
}

export default User;
