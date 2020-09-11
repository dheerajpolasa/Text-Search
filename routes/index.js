const express = require("express");
const router = express.Router();

const homeController = require("../controllers/home_controller");

// Router to handle the home page
router.get("/", homeController.home);

module.exports = router;
