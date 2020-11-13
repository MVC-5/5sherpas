import axios from "axios";

export default {
  // Logs in User
  loginUser: function (userData) {
    return axios({
      method: "post",
      data: userData,
      withCredentials: true,
      url: "/api/user/login",
    });
  },
  // register new user
  registerUser: function (userData) {
    return axios({
      method: "post",
      data: userData,
      withCredentials: true,
      url: "/api/user/register",
    });
  },
  // Gets user from matching username/password from login
  getUser: function () {
    // returns empty string or object with id, email, and name
    return axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/api/user",
    });
  },
  // Gets the user settings with the given id
  getUserSettings: function (id) {
    return axios.get("/api/user/" + id);
  },
  // Updates user settings with given id
  updateUserSettings: function (id, userData) {
    console.log(userData, id)
    return axios({
      method: "put",
      data: userData,
      url: "/api/user/" + id
    });
  },
  updateUserChallengeCategories: function (userData) {
    console.log(userData)
    return axios({
      method: "put",
      data: userData,
      url: "/api/user/categories"
    });
  },
  // Gets weekly challenges and progress map data
  getDashData: function (id) {
    return axios.get("/api/dashboard/" + id);
  },
  // Gets new weekly challenge when challenge sherpa clicked
  getNewChallenge: function () {
    return axios.get("/api/dashboard/newchallenge");
  },
  // Gets movie suggestion when movie sherpa clicked
  getMovieSugg: function (cat) {
    return axios.get("/api/dashboard/movie/" + cat);
  },
  // Gets physical activity suggestion when physical health sherpa clicked
  getPhysActSugg: function () {
    return axios.get("/api/dashboard/physical");
  },
  // Gets mental activity suggestion when mental health shepra clicked
  getMentalActSugg: function () {
    return axios.get("/api/dashboard/mental");
  },
  // Updates weekly challenge based on user selection of completed, not now, or never show again
  updateChall: function (id) {
    return axios.put("/api/dashboard/" + id);
  },
};
