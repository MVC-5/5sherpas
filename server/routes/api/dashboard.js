const router = require("express").Router();
const controller = require("../../controllers");

// Matches with "/api/dashboard"

// expects user id in the body {id: "xxxxxxxxx"}
router.route("/getdashboard").get(controller.getDashboard);

router.route("/movie").get(controller.getMovie);

router.route("/physical").get(controller.getPhysAct);

router.route("/mental").get(controller.getMentalAct);

router
  .route("/updatechallenge")
  // expect user id, challenge id, and action in the req.body
  .put(controller.updateChallenge);

module.exports = router;
