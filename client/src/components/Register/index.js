import React, { useState, useContext } from "react";
import { Button, Form, Popup } from "semantic-ui-react";
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

  const { setAuth, setIsNewUser } = useContext(AuthContext);

  const register = async (e) => {
    if (
      isValidEmail === "valid" &&
      registerName &&
      isValidPassword === "valid" &&
      registerPassword === registerPassword2
    ) {
      API.registerUser({
        email: registerEmail,
        name: registerName,
        password: registerPassword,
      }).then((res) => {
        if (res.data === "User already exists") {
          setMessage("User already exists");
        } else {
          API.loginUser({
            username: registerEmail,
            password: registerPassword,
          }).then(() => {
            setRegisterEmail("");
            setRegisterName("");
            setRegisterPassword("");
            setRegisterPassword2("");
            setMessage("Success!");
            setAuth(true);
            setIsNewUser(true);
            localStorage.setItem("newUser", "true");
            setTimeout(() => {
              setSendToSettings(true);
            }, 1000);
          });
        }
      });
    } else {
      if (isValidEmail === "not-valid") {
        setMessage("Please enter a valid email");
      } else if (isValidPassword === "not-valid") {
        setMessage(
          <div>
            <h2>Password must contain:</h2>
            <ul id="ver-list">
              <li>1 lowercase letter</li>
              <li>1 uppercase letter</li>
              <li>1 number</li>
              <li>at least 8 total characters</li>
            </ul>
          </div>
        );
      } else if (registerPassword !== registerPassword2) {
        setMessage("Password and Verify Password fields do not match");
      } else {
        setMessage("All fields are required");
      }
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

  const testPassword = (passwordA) => {
    if (
      // must contiain uppercase, lowercase, number, and be at least 8 characters long
      /^(?=[^\s].*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^\s]).{8,}$/i.test(
        passwordA
      )
    ) {
      setIsValidPassword("valid");
    } else {
      setIsValidPassword("not-valid");
    }
  };

  if (sendToSettings) {
    return <Redirect to="/usersettings" />;
  } else {
    return (
      <div id="register-form">
        <h1>Register</h1>
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

          <Popup
            trigger={
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
                    testPassword(e.target.value);
                    setRegisterPassword(e.target.value);
                  }}
                />
              </Form.Field>
            }
            header="Password Requirements"
            content={
              <ul>
                <li>1 lowercase letter</li>
                <li>1 uppercase letter</li>
                <li>1 number</li>
                <li>at least 8 characters</li>
              </ul>
            }
            on="focus"
          />

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
                setRegisterPassword2(e.target.value);
              }}
            />
          </Form.Field>
          <h2>{message}</h2>
          <Button type="submit">BEGIN</Button>
        </Form>
      </div>
    );
  }
}

export default Register;
