import React, { useState } from "react";
import axios from "axios";
import API from "../../utils/API";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const login = () => {
    API.loginUser({ username: loginEmail, password: loginPassword }).then(
      (res) => {
        console.log(res.data);
        setLoginEmail("");
        setLoginPassword("");
      }
    );
  };

  const getUser = () => {
    // move api call
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/api/user",
    }).then((res) => {
      console.log(res.data);
      return res.data.email;
    });
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <input
          type="text"
          name="loginEmail"
          id="loginUsername"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          type="text"
          name="loginPassword"
          id="loginPassword"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <button onClick={login}>Submit</button>
      </div>
      <button onClick={getUser}>Logged-in user in console</button>
    </>
  );
}

export default Login;
