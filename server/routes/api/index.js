const router = require("express").Router();
const userRoutes = require("./users");
const dashboardRoutes = require("./dashboard");

// User routes
router.use("/user", userRoutes);

router.use("/dashboard", dashboardRoutes);

module.exports = router;