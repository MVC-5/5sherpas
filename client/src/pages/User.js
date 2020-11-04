import React from "react";
import API from "../utils/API";
import { Container } from "../components/Grid";

function User() {

  // Loads all books and sets them to books
  function loadUserRoutes() {
    API.getUser()
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.getUserSettings(1)
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.updateUserSettings(1)
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.saveUser({})
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.getDashData(1)
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.getNewChallenge()
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.getMovieSugg()
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.getPhysActSugg()
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.getMentalActSugg()
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
    API.updateChall()
      .then(res =>
        console.log(res)
      )
      .catch(err => console.log(err));
  };

  loadUserRoutes()


  return (
    <Container>
    </Container>
  );
}

export default User;
