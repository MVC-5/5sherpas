import React from "react";
import User from "./pages/User";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <User />
    </div>
  );
}

export default App;
