// const db = require("../models");

const checkDate = () => {
  return true;
}

module.exports = {
  getChallenges: function (req, res) {
    // check date
    console.log(req)
    res.send(checkDate())
    // if new week update progress with previous weeks and get new challenges, add back to matchingActivties 

    // if not new week seend current challenges

    // get remaining says in week to send too
  },
  // completeChallenge: function(req, res) {

  // },
  // swapChallenge: function(req, res) {

  // },
  // neverDoChallenge: function(res, req) {

  // }
}