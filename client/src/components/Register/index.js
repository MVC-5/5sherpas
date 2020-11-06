import React, { useState } from "react";
import "./style.css";
// import { Formik, Form, Field, ErrorMessage } from "formik";

import API from "../../utils/API";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [message, setMessage] = useState("");

  const register = async (e) => {
    if (
      registerEmail &&
      registerName &&
      registerPassword &&
      registerPassword2
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

  const testPassword = (password, password2) => {
    if (
      /^(?=[^\s].*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).[^\s]{8,}$/i.test(
        password
      ) &&
      password === password2
    ) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };
  return (
    <>
      <div>
        <h1>Register</h1>
        <h2>{message}</h2>
        <form onSubmit={register}>
          <input
            type="text"
            name="regName"
            id="regName"
            placeholder="Name"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
          />

          <input
            type="email"
            name="regEmail"
            id="regEmail"
            placeholder="Email"
            value={registerEmail}
            className={isValidEmail ? "valid" : "not-valid"}
            onChange={(e) => {
              testEmail(e.target.value);
              setRegisterEmail(e.target.value);
            }}
          />

          <input
            type="password"
            name="regPassword"
            id="regPassword"
            placeholder="Password"
            value={registerPassword}
            className={isValidPassword ? "valid" : "not-valid"}
            onChange={(e) => {
              testPassword(e.target.value, registerPassword2);
              setRegisterPassword(e.target.value);
            }}
          />

          <input
            name="regPassword2"
            id="regPassword2"
            placeholder="Verify Password"
            type="password"
            value={registerPassword2}
            className={isValidPassword ? "valid" : "not-valid"}
            onChange={(e) => setRegisterPassword2(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default Register;
