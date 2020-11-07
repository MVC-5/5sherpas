import React from "react";
import User from "./pages/User";
import Login from "./components/Login";
import Register from "./components/Register";
import Settings from "./pages/UserSettings"

function App() {
  return (
    <div className="App">
      <Register />
      <Login />
      <User />
      <Settings />
    </div>
  );
}

export default App;
