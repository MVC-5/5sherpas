const router = require("express").Router();
const controller = require("../../controllers");

// Matches with "/api/dashboard"

router
  .route("/newchallenge")
  .get(controller.getChallenge)

router
  .route("/movie")
  .get(controller.getMovie)

router
  .route("/physical")
  .get(controller.getPhysAct)

router
  .route("/mental")
  .get(controller.getMentalAct)

router
  .route("/:id")
  .get(controller.getDashboard)
  .put(controller.updateChallenge)

module.exports = router;