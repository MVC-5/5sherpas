import React, { useContext } from "react";
// import API from "../utils/API";
import { Container } from "../components/Grid";
import AuthContext from "../utils/AuthContext";

function User() {
  const { userId, userEmail, userName } = useContext(AuthContext);

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
