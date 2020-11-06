import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Wrapper
import Wrapper from "./components/Wrapper";
// Pages
import LandingPage from "./pages/LandingPage";
import User from "./pages/User";
//components
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Wrapper>
            <Switch>
              <Route path="/" exact>
                <LandingPage />
              </Route>
              <Route path="/dashboard">
                <User />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
            </Switch>
          </Wrapper>
        </div>
      </Router>
    </div>
  );
}

export default App;
