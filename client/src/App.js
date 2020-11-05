import React, { useState } from "react";
import axios from "axios";
import User from "./pages/User";

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/api/user/register",
    }).then((res) => {
      console.log(res);
      setRegisterUsername("");
      setRegisterPassword("");
    });

    console.log(registerUsername);
    console.log(registerPassword);
  };

  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:3001/api/user/login",
    }).then((res) => {
      console.log(res);
      setLoginUsername("");
      setLoginPassword("");
    });
    console.log(loginUsername);
    console.log(loginPassword);
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          type="text"
          name="regUsername"
          id="regUsername"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="text"
          name="regPassword"
          id="regPassword"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          type="text"
          name="loginUsername"
          id="loginUsername"
          value={loginUsername}
          onChange={(e) => setLoginUsername(e.target.value)}
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

      <User />
    </div>
  );
}

export default App;
