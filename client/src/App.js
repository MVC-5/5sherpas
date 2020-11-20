import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// utils
import AuthContext from "./utils/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import API from "./utils/API";

// Wrapper
import Wrapper from "./components/Wrapper";
// Pages
import LandingPage from "./pages/LandingPage";
import UserDashboard from "./pages/UserDashboard";
//components
import Navbar from "./components/Navbar";
import AuthNav from "./components/AuthNav";
import UserLogin from "./pages/UserLogin";
import Registration from "./pages/Registration";
import UserSettings from "./pages/UserSettings/index";

function App() {
  const authCall = () => {
    API.getUser()
      .then((user) => {
        if (user.data.id) {
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("userId", user.data.id);
          setUserName(user.data.name);
          setUserId(user.data.id);
          setUserEmail(user.data.email);
          setAuth(true);
        }

        return user.data.name;
      })
      .catch((err) => {
        throw err;
      });
  };

  const [userName, setUserName] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [auth, setAuth] = useState(false);
  const isLoggedIn = sessionStorage.getItem("loggedIn");

  useEffect(() => {
    authCall();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ userId, userEmail, setAuth, userName, auth }}
    >
      <div className="App">
        <Router>
          <div>
            <Wrapper>
              {auth || isLoggedIn ? <AuthNav /> : <Navbar />}

              <Switch>
                <Route path="/" exact>
                  <LandingPage />
                </Route>
                <ProtectedRoute path="/dashboard">
                  <UserDashboard />
                </ProtectedRoute>
                <Route path="/register">
                  <Registration />
                </Route>
                <Route path="/login">
                  <UserLogin />
                </Route>
                <ProtectedRoute path="/usersettings">
                  <UserSettings />
                </ProtectedRoute>
              </Switch>
            </Wrapper>
          </div>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
