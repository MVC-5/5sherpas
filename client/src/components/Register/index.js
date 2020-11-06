import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import "./style.css";

import API from "../../utils/API";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [message, setMessage] = useState("");

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
        }
        console.log(res);
        setRegisterEmail("");
        setRegisterName("");
        setRegisterPassword("");
        setRegisterPassword2("");
        setMessage("Success!");
      });
    } else {
      setMessage("All fields are required");
    }
    e.preventDefault();
  };

  const testEmail = (email) => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
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
  return (
    <>
      <div>
        <h1>Register</h1>
        <h2>{message}</h2>
        <Form onSubmit={register}>
          <Form.Field>
            <label htmlFor="regName">
              Name
              <input
                type="text"
                name="regName"
                id="regName"
                placeholder="Name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="regEmail">
              Email
              <input
                error={isValidEmail}
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
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="regPassword">
              {" "}
              Password
              <input
                type="password"
                name="regPassword"
                id="regPassword"
                placeholder="Password"
                value={registerPassword}
                className={isValidPassword}
                onChange={(e) => {
                  testPassword(e.target.value, registerPassword2);
                  setRegisterPassword(e.target.value);
                }}
              />
            </label>
          </Form.Field>

          <Form.Field>
            <label htmlFor="regPassword2">
              Verify Password
              <input
                name="regPassword2"
                id="regPassword2"
                placeholder="Verify Password"
                type="password"
                value={registerPassword2}
                className={isValidPassword}
                onChange={(e) => {
                  testPassword(e.target.value, registerPassword);
                  setRegisterPassword2(e.target.value);
                }}
              />
            </label>
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </>
  );
}

export default Register;
