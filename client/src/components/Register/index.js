import React, { useState } from "react";
import API from "../../utils/API";

function Register() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const register = () => {
    API.registerUser({
      email: registerEmail,
      name: registerName,
      password: registerPassword,
    }).then((res) => {
      console.log(res);
      setRegisterEmail("");
      setRegisterName("");
      setRegisterPassword("");
    });
  };

  return (
    <>
      <div>
        <h1>Register</h1>
        <input
          type="text"
          name="regName"
          id="regName"
          placeholder="Name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
        />

        <input
          type="text"
          name="regEmail"
          id="regEmail"
          placeholder="Email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
        />

        <input
          type="text"
          name="regPassword"
          id="regPassword"
          placeholder="Password"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        {/* make password verify */}
        <button onClick={register}>Submit</button>
      </div>
    </>
  );
}

export default Register;
