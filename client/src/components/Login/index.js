import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import API from "../../utils/API";
import AuthContext from "../../utils/AuthContext";
import { Redirect } from "react-router-dom";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("not-valid");
  const [message, setMessage] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [sendToDash, setSendToDash] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const testEmail = (email) => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email)) {
      setIsValidEmail("not-valid");
    } else {
      setIsValidEmail("valid");
    }
  };

  const login = async (e) => {
    if (isValidEmail === "valid" && loginPassword) {
      API.loginUser({ username: loginEmail, password: loginPassword }).then(
        (res) => {
          if (res.data === "no user") {
            setLoginError(true);
            setMessage("Login credentials do not match any user.");
          } else {
            setMessage(res.data);
            setAuth(true);
            setTimeout(() => {
              setSendToDash(true);
            }, 1000);
          }

          setLoginEmail("");
          setLoginPassword("");
          setIsValidEmail("not-valid");
        }
      );
    } else {
      setMessage("Please provide a valid email and password.");
      setLoginError(true);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    e.preventDefault();
  };

  if (sendToDash) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <div id="login-form">
        <div>
          <h1>Login</h1>
          <h4>{message}</h4>
          <Form onSubmit={login}>
            <Form.Field required>
              <label htmlFor="loginEmail">Email</label>

              <input
                type="text"
                name="loginEmail"
                id="loginEmail"
                placeholder="Account Email"
                value={loginEmail}
                className={loginError ? "error-bg" : null}
                onChange={(e) => {
                  setLoginError(false);
                  testEmail(loginEmail);
                  setLoginEmail(e.target.value);
                }}
                onBlur={(e) => {
                  testEmail(loginEmail);
                  setLoginEmail(e.target.value);
                }}
              />
            </Form.Field>
            <Form.Field required>
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                name="loginPassword"
                id="loginPassword"
                autoComplete="on"
                placeholder="Password"
                value={loginPassword}
                className={loginError ? "error-bg" : null}
                onChange={(e) => {
                  setLoginError(false);
                  setLoginPassword(e.target.value);
                }}
              />
            </Form.Field>
            <Button onClick={login}>Submit</Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
