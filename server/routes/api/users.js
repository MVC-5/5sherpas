const router = require("express").Router();
const controller = require("../../controllers");

// Matches with "/api/user"
router.route("/")
  .get(controller.findUser)
  .post(controller.createUser);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(controller.findUserById)
  .put(controller.updateUserSettings)

module.exports = router;