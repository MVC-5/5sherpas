const router = require("express").Router();
const controller = require("../../controllers");

// Matches with "/api/dashboard"
router
  .route("/:id")
  .get(controller.getDashboard)
  .put(controller.updateChallenge)

router
  .route("/:id/newchallenge")
  .get(controller.getChallenge)

router
  .route("/:id/movie")
  .get(controller.getMovie)

router
  .route("/:id/physical")
  .get(controller.getPhysAct)

router
  .route("/:id/mental")
  .get(controller.getMentalAct)

module.exports = router;