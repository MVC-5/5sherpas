import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import API from "../../utils/API";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = (e) => {
    API.loginUser({ username: loginEmail, password: loginPassword }).then(
      (res) => {
        setMessage(res.data);
        setLoginEmail("");
        setLoginPassword("");
      }
    );
    e.preventDefault();
  };

  // this is more of a proof of concept. we can use this route to get user id, email, and name
  const getUser = () => {
    API.getUser().then((res) => {
      setMessage(res.data.name || "No user logged in");
      console.log(res.data);
      return res.data.email;
    });
  };

  return (
    <div id="login-form">
      <div>
        <h1>Login</h1>
        <Form onSubmit={login}>
          <Form.Field required>
            <label htmlFor="loginEmail">Email</label>

            <input
              type="text"
              name="loginEmail"
              id="loginEmail"
              placeholder="Account Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field required>
            <label htmlFor="loginPassword">Password</label>
            <input
              type="password"
              name="loginPassword"
              id="loginPassword"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </Form.Field>
          <Button onClick={login}>Submit</Button>
        </Form>
      </div>

      <h3>{message}</h3>
      <Button onClick={getUser}>Get current user.</Button>
    </div>
  );
}

export default Login;
