import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../utils/AuthContext";
import "./style.css";

import API from "../../utils/API";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState("valid");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [message, setMessage] = useState("");
  const [sendToSettings, setSendToSettings] = useState(false);

  const { setAuth } = useContext(AuthContext);

  const register = async (e) => {
    if (
      isValidEmail === "valid" &&
      registerName &&
      isValidPassword === "valid"
    ) {
      API.registerUser({
        email: registerEmail,
        name: registerName,
        password: registerPassword,
      }).then((res) => {
        if (res.data === "User already exists") {
          setMessage("User already exists");
        } else {
          API.loginUser({ username: registerEmail, password: registerPassword })
            .then(response => {
              console.log(response);
              setRegisterEmail("");
              setRegisterName("");
              setRegisterPassword("");
              setRegisterPassword2("");
              setMessage("Success!");
              setAuth(true);
              setTimeout(() => {
                setSendToSettings(true);
              }, 1000)
            })
        }
      });
    } else {
      setMessage("All fields are required");
    }
    e.preventDefault();
  };

  const testEmail = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setIsValidEmail("not-valid");
    } else {
      setIsValidEmail("valid");
    }
  };

  const testPassword = (passwordA, passwordB) => {
    if (
      // must contiain uppercase, lowercase, number, and be at least 8 characters long
      /^(?=[^\s].*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\s]).{8,}$/i.test(
        passwordA
      ) &&
      passwordA === passwordB
    ) {
      setIsValidPassword("valid");
    } else {
      setIsValidPassword("not-valid");
    }
  };

  if (sendToSettings) {
    return <Redirect to="/usersettings" />
  } else {


    return (
      <div id="register-form">
        <h1>Register</h1>
        <h2>{message}</h2>
        <Form onSubmit={register}>
          <Form.Field required>
            <label htmlFor="regName">Name</label>
            <input
              type="text"
              name="regName"
              id="regName"
              placeholder="Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="regEmail">Email</label>
            <input
              type="email"
              name="regEmail"
              id="regEmail"
              placeholder="Email"
              value={registerEmail}
              className={isValidEmail}
              onChange={(e) => {
                testEmail(e.target.value);
                setRegisterEmail(e.target.value);
              }}
            />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="regPassword">Password</label>
            <input
              type="password"
              name="regPassword"
              id="regPassword"
              autoComplete="on"
              placeholder="Password"
              value={registerPassword}
              className={isValidPassword}
              onChange={(e) => {
                testPassword(e.target.value, registerPassword2);
                setRegisterPassword(e.target.value);
              }}
            />
          </Form.Field>

          <Form.Field required>
            <label htmlFor="regPassword2">Verify Password</label>
            <input
              name="regPassword2"
              id="regPassword2"
              placeholder="Verify Password"
              type="password"
              autoComplete="on"
              value={registerPassword2}
              className={isValidPassword}
              onChange={(e) => {
                testPassword(e.target.value, registerPassword);
                setRegisterPassword2(e.target.value);
              }}
            />
          </Form.Field>
          <Button type="submit">BEGIN</Button>
        </Form>
      </div>
    );
  }
}

export default Register;
