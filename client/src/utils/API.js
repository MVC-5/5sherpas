import axios from "axios";

export default {

  getUser: function () {
    return axios.get("/api/user");
  },
  // Gets the book with the given id
  getUserSettings: function (id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the book with the given id
  updateUserSettings: function (id) {
    return axios.put("/api/user/" + id);
  },
  // Saves a book to the database
  saveUser: function (userData) {
    return axios.post("/api/user/", userData);
  },
  getDashData: function (id) {
    return axios.get("/api/dashboard/" + id);
  },
  getNewChallenge: function (id) {
    return axios.get("/api/dashboard/" + id + "/newchallenge");
  },
  getMovieSugg: function (id) {
    return axios.get("/api/dashboard/" + id + "/movie");
  },
  getPhysActSugg: function (id) {
    return axios.get("/api/dashboard/" + id + "/physical");
  },
  getMentalActSugg: function (id) {
    return axios.get("/api/dashboard/" + id + "/mental")
  },
  updateChall: function (id) {
    return axios.put("/api/dashboard/" + id);
  }
};
