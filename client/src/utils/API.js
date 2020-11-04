import axios from "axios";

export default {

  // Gets user from matching username/password from login
  getUser: function () {
    return axios.get("/api/user");
  },
  // Gets the user settings with the given id
  getUserSettings: function (id) {
    return axios.get("/api/user/" + id);
  },
  // Updates user settings with given id
  updateUserSettings: function (id) {
    return axios.put("/api/user/" + id);
  },
  // Saves new user account creation data
  saveUser: function (userData) {
    return axios.post("/api/user/", userData);
  },
  // Gets weekly challenges and progress map data
  getDashData: function (id) {
    return axios.get("/api/dashboard/" + id);
  },
  // Gets new weekly challenge when challenge sherpa clicked
  getNewChallenge: function (id) {
    return axios.get("/api/dashboard/" + id + "/newchallenge");
  },
  // Gets movie suggestion when movie sherpa clicked
  getMovieSugg: function (id) {
    return axios.get("/api/dashboard/" + id + "/movie");
  },
  // Gets physical activity suggestion when physical health sherpa clicked
  getPhysActSugg: function (id) {
    return axios.get("/api/dashboard/" + id + "/physical");
  },
  // Gets mental activity suggestion when mental health shepra clicked
  getMentalActSugg: function (id) {
    return axios.get("/api/dashboard/" + id + "/mental")
  },
  // Updates weekly challenge based on user selection of completed, not now, or never show again
  updateChall: function (id) {
    return axios.put("/api/dashboard/" + id);
  }
};
